import { Box, OutlinedInput, Button } from "@mui/material";
import Post from "../components/Post";

export default function Posts() {
	return (
		<Box>
			<Box sx={{ mb: 2, textAlign: "right" }}>
				<form>
					<OutlinedInput
						fullWidth
						placeholder="What's on your mind..."
						sx={{ mb: 1 }}
					/>
					<Button variant="contained">Add Post</Button>
				</form>
			</Box>

			<Post />
			<Post />
			<Post />
		</Box>
	);
}
