import { Stack } from "expo-router";

export default function RootLayout() {
	return (
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
	);
}
