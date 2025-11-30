import { PostType } from "@/types/global";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import { useApp } from "./app-provider";

type PostProps = {
	post: PostType;
	enableNavigation?: boolean;
};

export default function Post({ post, enableNavigation = true }: PostProps) {
    const queryClient = useQueryClient();
    const { auth } = useApp();
	const router = useRouter();

	const handleNavigate = () => {
		if (!enableNavigation) {
			return;
		}

		router.push(`/post/${post.id}`);
	};

	const handleOpenProfile = () => {
		router.push({
			pathname: "/(home)/profile",
			params: {
				userId: String(post.user.id),
			},
		});
	};

    const like = async () => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            await fetch(
				`http://localhost:8800/posts/${post.id}/like`,
				{
					method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            queryClient.invalidateQueries({ queryKey: ["posts"] });
            queryClient.invalidateQueries({ queryKey: ["post"] });
            queryClient.invalidateQueries({ queryKey: ["profile-posts"] });
        }
    };

    const unlike = async () => {
		const token = await AsyncStorage.getItem("token");
		if (token) {
			await fetch(`http://localhost:8800/posts/${post.id}/unlike`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			queryClient.invalidateQueries({ queryKey: ["posts"] });
			queryClient.invalidateQueries({ queryKey: ["post"] });
			queryClient.invalidateQueries({ queryKey: ["profile-posts"] });
		}
	};

    const isLiked = post.likes?.some(like => like.userId === auth?.id);

	return (
		<TouchableOpacity
			activeOpacity={enableNavigation ? 0.7 : 1}
			onPress={handleNavigate}
			style={styles.card}>
			<View style={styles.cardContent}>
				<View style={styles.avatar}></View>
				<View style={{ flexShrink: 1 }}>
					<View>
						<TouchableOpacity onPress={handleOpenProfile}>
							<Text style={styles.userName}>{post.user.name}</Text>
						</TouchableOpacity>
					</View>
					<View>
						<Text style={{ color: "green" }}>A few seconds ago</Text>
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
					{isLiked ? (
						<TouchableOpacity onPress={unlike}>
							<Ionicons
								name="heart"
								color="red"
								size={28}
							/>
						</TouchableOpacity>
					) : (
						<TouchableOpacity onPress={like}>
							<Ionicons
								name="heart-outline"
								color="red"
								size={28}
							/>
						</TouchableOpacity>
					)}
					<TouchableOpacity>
						<Text>{post.likes?.length || 0}</Text>
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
	userName: {
		fontSize: 21,
		fontWeight: "600",
		color: "#2563eb",
	},
	avatar: {
		width: 58,
		height: 58,
		borderRadius: 58,
		backgroundColor: "green",
	},
});
