import { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

import App from "./App";
import Posts from "./pages/Posts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Show from "./pages/Show";

const AppContext = createContext();

import { createBrowserRouter, RouterProvider } from "react-router";

let router = createBrowserRouter([
	{
		path: "/",
		Component: App,
		children: [
			{
				path: "/",
				Component: Posts,
			},
			{
				path: "/login",
				Component: Login,
			},
			{
				path: "/register",
				Component: Register,
			},
			{
				path: "/show/:id",
				Component: Show,
			},
		],
	},
]);

export default function AppProvider() {
	const [mode, setMode] = useState("dark");
    const [openDrawer, setOpenDrawer] = useState(false);

	const theme = useMemo(() => {
		console.log("running create theme function");
		return createTheme({
			palette: {
				mode,
			},
		});
	}, [mode]);

	return (
		<AppContext.Provider
			value={{ mode, setMode, openDrawer, setOpenDrawer }}>
			<ThemeProvider theme={theme}>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
					<CssBaseline />
				</QueryClientProvider>
			</ThemeProvider>
		</AppContext.Provider>
	);
}

export function useApp() {
	return useContext(AppContext);
}
