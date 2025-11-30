import { useState } from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
} from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useApp } from "@/components/app-provider";
import type { PostType } from "@/types/global";

async function createPost(content: string): Promise<PostType> {
	const token = await AsyncStorage.getItem("token");

	if (!token) {
		throw new Error("You must be logged in to create a post.");
	}

	const res = await fetch("http://localhost:8800/posts", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ content }),
	});

	if (!res.ok) {
		let message = "Unable to create post";
		try {
			const payload = await res.json();
			if (payload?.msg) {
				message = payload.msg;
			}
		} catch {
			// ignore JSON parse errors
		}
		throw new Error(message);
	}

	return res.json();
}

export default function NewPost() {
	const { auth } = useApp();
	const router = useRouter();
	const queryClient = useQueryClient();
	const [content, setContent] = useState("");

	const mutation = useMutation({
		mutationFn: (body: string) => createPost(body),
		onSuccess: post => {
			setContent("");
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			queryClient.invalidateQueries({ queryKey: ["post", String(post.id)] });
			router.replace(`/post/${post.id}`);
		},
	});

	const handleSubmit = () => {
		const trimmed = content.trim();
		if (!trimmed || mutation.isPending) {
			return;
		}

		mutation.mutate(trimmed);
	};

	if (!auth) {
		return (
			<View style={styles.center}>
				<Text style={styles.message}>
					Login to your account to create a new post.
				</Text>
			</View>
		);
	}

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : undefined}>
			<ScrollView contentContainerStyle={styles.container}>
				<Text style={styles.header}>Create a new post</Text>
				<TextInput
					value={content}
					onChangeText={setContent}
					multiline
					numberOfLines={8}
					placeholder="What's on your mind?"
					style={styles.input}
					textAlignVertical="top"
				/>
				{mutation.error ? (
					<Text style={styles.error}>
						{mutation.error instanceof Error
							? mutation.error.message
							: "Unable to create post"}
					</Text>
				) : null}
				<TouchableOpacity
					style={[styles.button, mutation.isPending && styles.buttonDisabled]}
					onPress={handleSubmit}
					disabled={mutation.isPending}>
					<Text style={styles.buttonLabel}>
						{mutation.isPending ? "Publishing..." : "Publish"}
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		paddingHorizontal: 20,
		paddingVertical: 24,
		gap: 16,
	},
	center: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
	},
	message: {
		textAlign: "center",
		fontSize: 16,
		color: "#444444",
	},
	header: {
		fontSize: 22,
		fontWeight: "600",
	},
	input: {
		minHeight: 160,
		borderWidth: 1,
		borderColor: "#cccccc",
		borderRadius: 12,
		paddingHorizontal: 16,
		paddingVertical: 12,
		backgroundColor: "white",
		fontSize: 16,
		lineHeight: 22,
	},
	error: {
		color: "red",
		fontSize: 14,
	},
	button: {
		backgroundColor: "green",
		paddingVertical: 14,
		borderRadius: 12,
		alignItems: "center",
	},
	buttonDisabled: {
		opacity: 0.7,
	},
	buttonLabel: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
});

