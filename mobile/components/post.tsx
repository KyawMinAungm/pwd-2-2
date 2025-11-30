import { PostType } from "@/types/global";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

type PostProps = {
	post: PostType;
	enableNavigation?: boolean;
};

export default function Post({ post, enableNavigation = true }: PostProps) {
	const router = useRouter();

	const handleNavigate = () => {
		if (!enableNavigation) {
			return;
		}

		router.push(`/post/${post.id}`);
	};

	return (
		<TouchableOpacity
			activeOpacity={enableNavigation ? 0.7 : 1}
			onPress={handleNavigate}
			style={styles.card}>
			<View style={styles.cardContent}>
				<View style={styles.avatar}></View>
				<View style={{ flexShrink: 1 }}>
					<View>
						<Text style={{ fontSize: 21 }}>{post.user.name}</Text>
					</View>
					<View>
						<Text style={{ color: "green" }}>
							A few seconds agao
						</Text>
					</View>
					<View style={{ marginTop: 5 }}>
						<Text style={{ fontSize: 16 }}>
							{post.content}
						</Text>
					</View>
				</View>
			</View>
			<View
				style={{
					marginTop: 16,
					flexDirection: "row",
					justifyContent: "space-around",
				}}>
				<View
					style={{
						flexDirection: "row",
						gap: 5,
						alignItems: "center",
					}}>
					<TouchableOpacity>
						<Ionicons
							name="heart-outline"
							color="red"
							size={28}
						/>
					</TouchableOpacity>
					<TouchableOpacity>
						<Text>5</Text>
					</TouchableOpacity>
				</View>
				<View
					style={{
						flexDirection: "row",
						gap: 5,
						alignItems: "center",
					}}>
					<TouchableOpacity>
						<Ionicons
							name="chatbubbles-outline"
							color="grey"
							size={28}
						/>
					</TouchableOpacity>
					<TouchableOpacity>
						<Text>{post.comments.length}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		borderBottomWidth: 1,
		borderBottomColor: "#cccccc80",
		paddingHorizontal: 12,
		paddingVertical: 16,
		backgroundColor: "white",
	},
	cardContent: {
		flexDirection: "row",
		gap: 10,
	},
	avatar: {
		width: 58,
		height: 58,
		borderRadius: 58,
		backgroundColor: "green",
	},
});
