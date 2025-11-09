import { Box, Button, OutlinedInput, Typography } from "@mui/material";

export default function Login() {
	return (
		<Box>
			<Typography variant="h3" sx={{ mb: 4 }}>Login</Typography>
			<form>
				<OutlinedInput
					fullWidth
					sx={{ mb: 1 }}
					placeholder="username"
				/>
				<OutlinedInput
					type="password"
					fullWidth
					sx={{ mb: 1 }}
					placeholder="password"
				/>
                <Button fullWidth variant="contained">Login</Button>
			</form>
		</Box>
	);
}
