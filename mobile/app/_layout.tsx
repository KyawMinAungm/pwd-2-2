import { Stack } from "expo-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
	return (
		<QueryClientProvider client={queryClient}>
			<Stack>
				<Stack.Screen
					name="(home)"
					options={{
						title: "Home",
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="post/[id]"
					options={{
						title: "Post Detail",
					}}
				/>
			</Stack>
		</QueryClientProvider>
	);
}
