import { StyleSheet, Text, View } from "react-native";
import type { CommentType } from "@/types/global";

type CommentProps = {
	comment: CommentType;
};

export default function Comment({ comment }: CommentProps) {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.author}>{comment.user.name}</Text>
			</View>
			<Text style={styles.content}>{comment.content}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		borderRadius: 12,
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderWidth: 1,
		borderColor: "#dcdcdc",
	},
	header: {
		marginBottom: 6,
	},
	author: {
		fontWeight: "600",
		fontSize: 16,
	},
	content: {
		fontSize: 15,
		color: "#333333",
		lineHeight: 20,
	},
});

