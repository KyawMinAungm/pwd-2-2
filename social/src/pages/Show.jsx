import { Box, Button, OutlinedInput, Typography } from "@mui/material";
import Post from "../components/Post";
import Comment from "../components/Comment";

export default function Show() {
	return (
		<Box>
			<Post />

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

			<Comment />
			<Comment />
		</Box>
	);
}
