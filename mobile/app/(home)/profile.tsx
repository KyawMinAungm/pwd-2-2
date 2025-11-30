import { useApp } from "@/components/app-provider";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
	ActivityIndicator,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import Post from "@/components/post";
import type { PostType, UserType } from "@/types/global";

async function fetchUserPosts(userId: number): Promise<PostType[]> {
	const res = await fetch(`http://localhost:8800/posts?userId=${userId}`);

	if (!res.ok) {
		throw new Error("Unable to load profile posts.");
	}

	return res.json();
}

async function fetchUser(userId: number): Promise<UserType> {
	const res = await fetch(`http://localhost:8800/users/${userId}`);

	if (!res.ok) {
		let message = "Unable to load user.";
		try {
			const payload = await res.json();
			if (payload?.msg) {
				message = payload.msg;
			}
		} catch {
			// ignore json parse error
		}

		throw new Error(message);
	}

	return res.json();
}

export default function Profile() {
	const { auth, setAuth } = useApp();
	const params = useLocalSearchParams<{ userId?: string }>();
	const userIdParam = params.userId;
	const hasUserIdParam = typeof userIdParam === "string";
	const parsedUserId = hasUserIdParam ? Number(userIdParam) : undefined;
	const isParamValid =
		typeof parsedUserId === "number" && Number.isInteger(parsedUserId);

	const targetUserId = hasUserIdParam ? parsedUserId : auth?.id;
	const canLoadPosts =
		typeof targetUserId === "number" && Number.isInteger(targetUserId);

	const {
		data: profileUser,
		isLoading: isProfileLoading,
		error: profileError,
	} = useQuery({
		queryKey: ["profile-user", targetUserId],
		queryFn: () => fetchUser(targetUserId as number),
		enabled: hasUserIdParam && canLoadPosts,
	});

	const {
		data: userPosts,
		isLoading: isPostsLoading,
		error: postsError,
	} = useQuery({
		queryKey: ["profile-posts", targetUserId ?? "self"],
		queryFn: () => fetchUserPosts(targetUserId as number),
		enabled: canLoadPosts,
	});

	const [usernameInput, setUsernameInput] = useState("");
	const [passwordInput, setPasswordInput] = useState("");

	const displayedUser = hasUserIdParam ? profileUser : auth;
	const isOwnProfile =
		!hasUserIdParam ||
		(!!auth && !!displayedUser && auth.id === displayedUser.id);
	const shouldShowLogin = !hasUserIdParam && !auth;

	const login = async () => {
		const res = await fetch("http://localhost:8800/users/login", {
			method: "POST",
			body: JSON.stringify({
				username: usernameInput,
				password: passwordInput,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!res.ok) {
			alert("Unable to login");
			return false;
		}

		const { user, token } = await res.json();
		await AsyncStorage.setItem("token", token);
		setAuth(user);
	};

	const logout = async () => {
		await AsyncStorage.removeItem("token");
		setAuth(undefined);
	};

	if (hasUserIdParam && !isParamValid) {
		return (
			<View style={[styles.screen, styles.fullCenter]}>
				<Text style={styles.message}>Invalid user id.</Text>
			</View>
		);
	}

	if (hasUserIdParam && isProfileLoading) {
		return (
			<View style={[styles.screen, styles.fullCenter]}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	if (hasUserIdParam && profileError) {
		const message =
			profileError instanceof Error
				? profileError.message
				: "Unable to load user.";
		return (
			<View style={[styles.screen, styles.fullCenter]}>
				<Text style={styles.message}>{message}</Text>
			</View>
		);
	}

	if (shouldShowLogin) {
		return (
			<View style={styles.screen}>
				<View style={styles.fullCenter}>
					<Text style={{ fontSize: 18, fontWeight: "bold" }}>Login</Text>
					<View style={{ marginTop: 20, gap: 10 }}>
						<TextInput
							value={usernameInput}
							onChangeText={setUsernameInput}
							autoCapitalize="none"
							style={{
								width: 300,
								fontSize: 18,
								borderWidth: 1,
								borderColor: "#66666650",
								borderRadius: 10,
								padding: 10,
								backgroundColor: "white",
							}}
							placeholder="username"
						/>
						<TextInput
							value={passwordInput}
							onChangeText={setPasswordInput}
							secureTextEntry
							style={{
								width: 300,
								fontSize: 18,
								borderWidth: 1,
								borderColor: "#66666650",
								borderRadius: 10,
								padding: 10,
								backgroundColor: "white",
							}}
							placeholder="password"
						/>
						<TouchableOpacity
							style={{
								width: 300,
								borderRadius: 10,
								paddingVertical: 10,
								paddingHorizontal: 30,
								backgroundColor: "green",
								alignItems: "center",
							}}
							onPress={() => {
								login();
								setUsernameInput("");
								setPasswordInput("");
							}}>
							<Text style={{ color: "white", fontSize: 18 }}>Login</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}

	if (hasUserIdParam && !displayedUser) {
		return (
			<View style={[styles.screen, styles.fullCenter]}>
				<Text style={styles.message}>User not found.</Text>
			</View>
		);
	}

	if (!displayedUser) {
		return (
			<View style={[styles.screen, styles.fullCenter]}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	return (
		<View style={styles.screen}>
			<ScrollView
				style={styles.screen}
				contentContainerStyle={styles.profileContent}>
				<View style={styles.banner} />
				<View style={styles.profileSection}>
					<View style={styles.profileCard}>
						<View style={styles.avatarPlaceholder} />
						<Text style={styles.profileName}>{displayedUser.name}</Text>
						<Text style={styles.profileUsername}>
							@{displayedUser.username}
						</Text>
						{displayedUser.bio ? (
							<Text style={styles.profileBio}>{displayedUser.bio}</Text>
						) : null}
						{isOwnProfile && auth ? (
							<TouchableOpacity
								style={styles.logoutButton}
								onPress={logout}>
								<Text style={styles.logoutLabel}>Logout</Text>
							</TouchableOpacity>
						) : null}
					</View>
				</View>

				<View style={styles.postsSection}>
					<Text style={styles.sectionTitle}>Posts</Text>
					{!canLoadPosts ? (
						<Text style={styles.message}>Posts are unavailable.</Text>
					) : isPostsLoading ? (
						<ActivityIndicator size="large" />
					) : postsError ? (
						<Text style={styles.message}>
							{postsError instanceof Error
								? postsError.message
								: "Unable to load posts."}
						</Text>
					) : userPosts?.length ? (
						<View style={styles.postsList}>
							{userPosts.map(post => (
								<Post
									key={post.id}
									post={post}
								/>
							))}
						</View>
					) : (
						<Text style={styles.message}>No posts yet.</Text>
					)}
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "#f4f4f5",
	},
	fullCenter: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 16,
	},
	profileContent: {
		paddingBottom: 32,
	},
	banner: {
		height: 140,
		backgroundColor: "#d9d9df",
	},
	profileSection: {
		marginTop: -60,
		paddingHorizontal: 16,
	},
	profileCard: {
		alignItems: "center",
		backgroundColor: "white",
		borderRadius: 18,
		paddingTop: 72,
		paddingBottom: 24,
		paddingHorizontal: 16,
		gap: 8,
		shadowColor: "#000000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.12,
		shadowRadius: 12,
		elevation: 3,
	},
	avatarPlaceholder: {
		width: 108,
		height: 108,
		borderRadius: 54,
		backgroundColor: "#5b7cff",
		marginTop: -108,
		borderWidth: 6,
		borderColor: "white",
	},
	profileName: {
		fontSize: 22,
		fontWeight: "700",
		color: "#111827",
		textAlign: "center",
	},
	profileUsername: {
		fontSize: 16,
		color: "#4b5563",
	},
	profileBio: {
		fontSize: 14,
		color: "#374151",
		textAlign: "center",
	},
	logoutButton: {
		marginTop: 12,
		paddingVertical: 10,
		paddingHorizontal: 32,
		borderRadius: 999,
		backgroundColor: "#ef4444",
	},
	logoutLabel: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
	postsSection: {
		marginTop: 24,
		paddingHorizontal: 16,
		gap: 12,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "700",
		color: "#111827",
	},
	message: {
		fontSize: 16,
		color: "#4b5563",
	},
	postsList: {
		gap: 12,
	},
});
