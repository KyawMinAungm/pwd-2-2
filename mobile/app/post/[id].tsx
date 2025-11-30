import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
	ActivityIndicator,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	StyleSheet,
} from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Post from "@/components/post";
import Comment from "@/components/comment";
import { useApp } from "@/components/app-provider";
import type { CommentType, PostType } from "@/types/global";

async function fetchPost(postId: string): Promise<PostType> {
	const res = await fetch(`http://localhost:8800/posts/${postId}`);

	if (!res.ok) {
		throw new Error("Unable to load post");
	}

	const data = await res.json();

	if (!data) {
		throw new Error("Post not found");
	}

	return data;
}

async function createComment(postId: string, content: string): Promise<CommentType> {
	const token = await AsyncStorage.getItem("token");

	if (!token) {
		throw new Error("You must be logged in to comment.");
	}

	const res = await fetch(`http://localhost:8800/posts/${postId}/comments`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ content }),
	});

	if (!res.ok) {
		let message = "Unable to create comment";
		try {
			const payload = await res.json();
			if (payload?.msg) {
				message = payload.msg;
			}
		} catch (error) {
			// ignore json parse error
		}
		throw new Error(message);
	}

	return res.json();
}

export default function PostDetail() {
	const { id } = useLocalSearchParams();
	const postId = Array.isArray(id) ? id[0] : id;

	const { auth } = useApp();
	const queryClient = useQueryClient();
	const [commentInput, setCommentInput] = useState("");

	const { data, isLoading, error } = useQuery({
		queryKey: ["post", postId],
		queryFn: () => fetchPost(postId as string),
		enabled: typeof postId === "string",
	});

	const commentMutation = useMutation({
		mutationFn: (content: string) => createComment(postId as string, content),
		onSuccess: () => {
			setCommentInput("");
			queryClient.invalidateQueries({ queryKey: ["post", postId] });
		},
	});

	if (!postId) {
		return (
			<View style={styles.center}>
				<Text style={styles.message}>Invalid post id</Text>
			</View>
		);
	}

	if (isLoading) {
		return (
			<View style={styles.center}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	if (error) {
		const message =
			error instanceof Error ? error.message : "Something went wrong";

		return (
			<View style={styles.center}>
				<Text style={styles.message}>{message}</Text>
			</View>
		);
	}

	if (!data) {
		return (
			<View style={styles.center}>
				<Text style={styles.message}>Unable to load this post.</Text>
			</View>
		);
	}

	const handleSubmit = () => {
		if (!commentInput.trim() || commentMutation.isPending) {
			return;
		}

		commentMutation.mutate(commentInput.trim());
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Post
				post={data}
				enableNavigation={false}
			/>

			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Add a comment</Text>
				{auth ? (
					<View style={styles.form}>
						<TextInput
							value={commentInput}
							onChangeText={setCommentInput}
							multiline
							numberOfLines={4}
							placeholder="Share your thoughts..."
							style={styles.input}
							textAlignVertical="top"
						/>
						{commentMutation.error ? (
							<Text style={styles.errorText}>
								{commentMutation.error instanceof Error
									? commentMutation.error.message
									: "Unable to create comment"}
							</Text>
						) : null}
						<TouchableOpacity
							style={[
								styles.submitButton,
								commentMutation.isPending && styles.submitButtonDisabled,
							]}
							onPress={handleSubmit}
							disabled={commentMutation.isPending}>
							<Text style={styles.submitLabel}>
								{commentMutation.isPending ? "Posting..." : "Post Comment"}
							</Text>
						</TouchableOpacity>
					</View>
				) : (
					<Text style={styles.message}>
						Login to your account to leave a comment.
					</Text>
				)}
			</View>

			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Comments</Text>
				<View style={styles.commentList}>
					{data.comments.length ? (
						data.comments.map(comment => (
							<Comment
								key={comment.id}
								comment={comment}
							/>
						))
					) : (
						<Text style={styles.message}>No comments yet.</Text>
					)}
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 16,
		paddingHorizontal: 16,
		gap: 24,
	},
	center: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 16,
	},
	message: {
		fontSize: 16,
		color: "#444444",
		textAlign: "center",
	},
	section: {
		gap: 12,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "600",
	},
	commentList: {
		gap: 12,
	},
	form: {
		gap: 12,
	},
	input: {
		minHeight: 120,
		borderWidth: 1,
		borderColor: "#cccccc",
		borderRadius: 12,
		paddingHorizontal: 14,
		paddingVertical: 12,
		backgroundColor: "white",
		fontSize: 16,
	},
	submitButton: {
		backgroundColor: "green",
		paddingVertical: 14,
		borderRadius: 12,
		alignItems: "center",
	},
	submitButtonDisabled: {
		opacity: 0.7,
	},
	submitLabel: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
	errorText: {
		color: "red",
	},
});
