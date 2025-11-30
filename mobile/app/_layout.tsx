import { Stack } from "expo-router";

import AppProvider from "@/components/app-provider";

export default function RootLayout() {
	return (
		<AppProvider>
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
				<Stack.Screen
					name="post/new"
					options={{
						title: "New Post",
                        // presentation: "modal",
					}}
				/>
			</Stack>
		</AppProvider>
	);
}
