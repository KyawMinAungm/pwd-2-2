import { Text, View, ScrollView } from "react-native";
import Post from "@/components/post";

export default function Index() {
	return (
		<ScrollView>
			<Post />
			<Post />
			<Post />
			<Post />
			<Post />
		</ScrollView>
	);
}
