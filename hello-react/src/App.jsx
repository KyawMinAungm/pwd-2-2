import { useState, useRef } from "react";

import {
	Container,
	OutlinedInput,
	IconButton,
	List,
	Divider,
} from "@mui/material";

import { Add as AddIcon } from "@mui/icons-material";

import Item from "./Item";
import Header from "./Header";

export default function App() {
	const inputRef = useRef();

	const [data, setData] = useState([
		{ id: 3, name: "Egg", done: true },
		{ id: 2, name: "Bread", done: false },
		{ id: 1, name: "Butter", done: false },
	]);

	const add = () => {
		const id = data[0].id + 1;
		const name = inputRef.current.value;
		if (name == "") return false;

		setData([{ id, name, done: false }, ...data]);
	};

	const del = id => {
		setData(data.filter(item => item.id !== id));
	};

	const toggle = id => {
		setData(
			data.map(item => {
				if (item.id === id) item.done = !item.done;
				return item;
			})
		);
	};

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
