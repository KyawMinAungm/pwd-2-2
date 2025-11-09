import {
    Avatar,
    Box, Typography
} from "@mui/material";
import { green, grey } from "@mui/material/colors";

import { useNavigate } from "react-router";

export default function Comment() {
	const navigate = useNavigate();

	return (
		<Box sx={{ mb: 2, padding: 2, border: "1px solid #88888820" }}>
			<Box sx={{ display: "flex", gap: 2 }}>
				<Avatar sx={{ background: grey[500], width: 48, height: 48 }}>
					B
				</Avatar>
				<Box>
					<Typography>Bob</Typography>
					<Typography sx={{ fontSize: 12, color: green[500] }}>
						a few minutes ago
					</Typography>
					<Typography
						sx={{ mt: 1 }}
						onClick={() => navigate("/show/123")}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Repudiandae eos laudantium similique vitae, voluptas at
						dicta sit, officiis commodi.
					</Typography>
				</Box>
			</Box>
		</Box>
	);
}
