import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useState,
} from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { UserType } from "../types/global";

const queryClient = new QueryClient();

type AppContextValue = {
	auth: UserType | undefined;
	setAuth: Dispatch<SetStateAction<UserType | undefined>>;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export default function AppProvider({ children }: { children: ReactNode }) {
	const [auth, setAuth] = useState<UserType | undefined>();

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
