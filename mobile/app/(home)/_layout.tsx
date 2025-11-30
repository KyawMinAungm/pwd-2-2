import { Tabs, Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";

export default function HomeLayout() {
	return (
		<Tabs>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					headerRight: () => (
						<Link
							href="/post/new"
							asChild>
							<TouchableOpacity
								style={{ paddingHorizontal: 16 }}
								accessibilityRole="button"
								accessibilityLabel="Create new post">
								<Ionicons
									name="add"
									size={28}
								/>
							</TouchableOpacity>
						</Link>
					),
					tabBarIcon: ({ color }) => (
						<Ionicons
							name="home-outline"
							color={color}
							size={24}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color }) => (
						<Ionicons
							name="person-outline"
							color={color}
							size={24}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: "Settings",
					tabBarIcon: ({ color }) => (
						<Ionicons
							name="settings-outline"
							color={color}
							size={24}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
