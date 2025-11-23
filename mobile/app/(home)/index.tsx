import { Text, View, ScrollView } from "react-native";
import Post from "@/components/post";

import { useQuery } from "@tanstack/react-query";
import type { PostType } from "@/types/global";

async function fetchPosts(): Promise<PostType[]> {
	const res = await fetch("http://192.168.1.26:8800/posts");
	return res.json();
}

export default function Index() {
	const { data, isLoading, error } = useQuery({
		queryKey: ["posts"],
		queryFn: fetchPosts,
	});

	if (isLoading) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}>
				<Text>Loading...</Text>
			</View>
		);
	}

	if (error) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}>
				<Text>{error.message}</Text>
			</View>
		);
	}

	return (
		<ScrollView>
			{data?.map(item => {
				return (
					<Post
						key={item.id}
						post={item}
					/>
				);
			})}
		</ScrollView>
	);
}
