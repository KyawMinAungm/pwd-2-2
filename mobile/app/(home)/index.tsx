import Post from "@/components/post";
import { ScrollView, Text, View } from "react-native";

import type { PostType } from "@/types/global";
import { useQuery } from "@tanstack/react-query";

async function fetchPosts(): Promise<PostType[]> {
	const res = await fetch("http://localhost:8800/posts");
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
