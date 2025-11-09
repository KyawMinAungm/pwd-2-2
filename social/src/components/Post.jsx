import {
	Avatar,
	Box,
	Card,
	CardContent,
	Typography,
	IconButton,
	ButtonGroup,
    Button,
} from "@mui/material";
import { green } from "@mui/material/colors";

import {
	FavoriteBorder as LikeIcon,
	ChatBubble as CommentIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router";

export default function Post() {
    const navigate = useNavigate();

	return (
		<Card sx={{ mb: 2 }}>
			<CardContent sx={{ display: "flex", gap: 2 }}>
				<Avatar sx={{ background: green[500], width: 64, height: 64 }}>
					A
				</Avatar>
				<Box>
					<Typography>Alice</Typography>
					<Typography sx={{ fontSize: 12, color: green[500] }}>
						a few minutes ago
					</Typography>
					<Typography sx={{ mt: 1 }} onClick={() => navigate("/show/123")}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Repudiandae eos laudantium similique vitae, voluptas at
						dicta sit, officiis commodi.
					</Typography>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-around",
							mt: 2,
						}}>
						<ButtonGroup>
							<IconButton size="sm">
								<LikeIcon color="error" />
							</IconButton>
							<Button
								size="sm"
								variant="text">
								10
							</Button>
						</ButtonGroup>
						<ButtonGroup>
							<IconButton size="sm">
								<CommentIcon color="success" />
							</IconButton>
							<Button
								size="sm"
								variant="text">
								5
							</Button>
						</ButtonGroup>
					</Box>
				</Box>
			</CardContent>
		</Card>
	);
}
