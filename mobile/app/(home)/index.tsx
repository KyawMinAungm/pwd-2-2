import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}>
			<Text style={{ fontSize: 24, fontWeight: "bold" }}>Home</Text>

            <Link href="/post/123">Post 123</Link>
		</View>
	);
}
