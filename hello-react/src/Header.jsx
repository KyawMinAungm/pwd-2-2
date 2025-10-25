import {
	Box,
	AppBar,
	Toolbar,
	Typography,
	Badge,
	IconButton,
} from "@mui/material";

import {
	LightMode as LightModeIcon,
	DarkMode as DarkModeIcon,
} from "@mui/icons-material";

import { useApp } from "./AppProvider";

export default function Header({ count }) {
	const { mode, setMode } = useApp();

	return (
		<AppBar position="static">
			<Toolbar>
				<Box sx={{ flexGrow: 1 }}>
					<Badge
						badgeContent={count}
						color="error">
						<Typography>Todo</Typography>
					</Badge>
				</Box>

				{mode === "dark" ? (
					<IconButton color="inherit" onClick={() => setMode("light")}>
						<LightModeIcon />
					</IconButton>
				) : (
					<IconButton color="inherit" onClick={() => setMode("dark")}>
						<DarkModeIcon />
					</IconButton>
				)}
			</Toolbar>
		</AppBar>
	);
}
