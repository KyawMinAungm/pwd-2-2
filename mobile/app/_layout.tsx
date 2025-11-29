import AppProvider from "@/components/app-provider";
import { Stack } from "expo-router";

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
			</Stack>
		</AppProvider>
	);
}
