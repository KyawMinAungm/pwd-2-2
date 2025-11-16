import { Box, Button, OutlinedInput, Typography } from "@mui/material";
import Post from "../components/Post";
import Comment from "../components/Comment";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

const api = "http://localhost:8800";

export default function Show() {
    const { id } = useParams();

    const { data: post, error, isLoading } = useQuery({
        queryKey: ["posts", id],
        queryFn: async () => {
            const res = await fetch(`${api}/posts/${id}`);
			return res.json();
        }
    });

    if (isLoading) {
		return (
			<Box>
				<Typography>Loading...</Typography>
			</Box>
		);
	}

	if (error) {
		return (
			<Box>
				<Typography>{error}</Typography>
			</Box>
		);
	}

	return (
		<Box>
			<Post post={post} />

			<Box sx={{ mb: 2, textAlign: "right" }}>
				<form>
					<OutlinedInput
						fullWidth
						placeholder="Your reply..."
						sx={{ mb: 1 }}
					/>
					<Button variant="contained">Add Comment</Button>
				</form>
			</Box>

			{post.comments && post.comments.map(comment => {
                return <Comment key={comment.key} comment={comment} />
            })}
		</Box>
	);
}
