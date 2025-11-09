import { Box, Typography, OutlinedInput, Button } from "@mui/material";

export default function Register() {
	return (
		<Box>
			<Box>
				<Typography
					variant="h3"
					sx={{ mb: 4 }}>
					Register
				</Typography>
				<form>
					<OutlinedInput
						fullWidth
						sx={{ mb: 1 }}
						placeholder="name"
					/>
					<OutlinedInput
						fullWidth
						sx={{ mb: 1 }}
						placeholder="username"
					/>
					<OutlinedInput
						fullWidth
						sx={{ mb: 1 }}
						placeholder="bio"
					/>
					<OutlinedInput
						type="password"
						fullWidth
						sx={{ mb: 1 }}
						placeholder="password"
					/>
					<Button
						fullWidth
						variant="contained">
						Register
					</Button>
				</form>
			</Box>
		</Box>
	);
}
