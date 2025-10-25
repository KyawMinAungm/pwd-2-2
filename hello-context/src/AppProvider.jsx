import { createContext, useContext } from "react";

const AppContext = createContext();

export default function AppProvider({ children }) {
    return <AppContext.Provider value="30">
        {children}
    </AppContext.Provider>
}

export function useApp() {
    return useContext(AppContext);
}
