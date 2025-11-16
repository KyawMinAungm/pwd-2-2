import { Box, OutlinedInput, Button, Typography } from "@mui/material";
import Post from "../components/Post";

import { useQuery } from "@tanstack/react-query";

const api = "http://localhost:8800";

export default function Posts() {
    const { data: posts, error, isLoading } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const res = await fetch(`${api}/posts`);
            return res.json();
        }
    })

    if(isLoading) {
        return <Box>
            <Typography>Loading...</Typography>
        </Box>
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

			{posts.map(post => {
                return <Post key={post.id} post={post} />
            })}
		</Box>
	);
}
