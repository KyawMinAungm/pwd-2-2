import { useRef } from "react";

import {
	Container,
	OutlinedInput,
	IconButton,
	List,
	Divider,
} from "@mui/material";

import { Add as AddIcon } from "@mui/icons-material";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import Item from "./Item";
import Header from "./Header";

const api = "http://localhost:8800/items";

export default function App() {
	const inputRef = useRef();
	const queryClient = useQueryClient();

	const { data, error, isLoading } = useQuery({
		queryKey: ["items"],
		queryFn: async () => {
			const res = await fetch(api);
			return res.json();
		},
	});

	const add = async () => {
		const name = inputRef.current.value;
		if (name == "") return false;

		await fetch(api, {
			method: "POST",
			body: JSON.stringify({ name }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		queryClient.invalidateQueries(["items"]);
	};

	const del = async id => {
		await fetch(`${api}/${id}`, { method: "DELETE" });
		queryClient.invalidateQueries(["items"]);
	};

	const toggle = async id => {
		await fetch(`${api}/${id}/toggle`, { method: "PUT" });
		queryClient.invalidateQueries(["items"]);
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Unable to fetch API</div>;
	}

	return (
		<div>
			<Header count={data.length} />

			<Container
				maxWidth="sm"
				sx={{ mt: 4 }}>
				<form
					onSubmit={e => {
						e.preventDefault();
						add();
						e.currentTarget.reset();
					}}>
					<OutlinedInput
						fullWidth
						type="text"
						inputRef={inputRef}
						endAdornment={
							<IconButton type="submit">
								<AddIcon />
							</IconButton>
						}
					/>
				</form>

				<List>
					{data
						.filter(item => !item.done)
						.map(item => (
							<Item
								key={item.id}
								item={item}
								del={del}
								toggle={toggle}
							/>
						))}
				</List>
				<Divider />
				<List>
					{data
						.filter(item => item.done)
						.map(item => (
							<Item
								key={item.id}
								item={item}
								del={del}
								toggle={toggle}
							/>
						))}
				</List>
			</Container>
		</div>
	);
}
