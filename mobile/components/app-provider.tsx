import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import type { UserType } from "../types/global";
import AsyncStorage from "@react-native-async-storage/async-storage";

const queryClient = new QueryClient();

type AppContextValue = {
	auth: UserType | undefined;
	setAuth: Dispatch<SetStateAction<UserType | undefined>>;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export default function AppProvider({ children }: { children: ReactNode }) {
	const [auth, setAuth] = useState<UserType | undefined>();

    useEffect(() => {
        (async () => {
            const token = await AsyncStorage.getItem("token");

            const res = await fetch("http://localhost:8800/users/verify", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

            if(res.ok) {
                const user = await res.json();
                setAuth(user);
            } else {
                await AsyncStorage.removeItem("token");
            }
        })();
    }, []);

	return (
		<AppContext.Provider value={{ auth, setAuth }}>
			<QueryClientProvider client={queryClient}>
				{children}
			</QueryClientProvider>
		</AppContext.Provider>
	);
}

export function useApp() {
	const context = useContext(AppContext);

	if (!context) {
		throw new Error("useApp must be used within an AppProvider");
	}

	return context;
}
