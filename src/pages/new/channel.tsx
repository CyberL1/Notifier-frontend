import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	TextareaAutosize,
	TextField,
} from "@mui/material";
import { FormEvent, useEffect, useState } from "react";

export default function NewChannel() {
	const [channels, setChannels] = useState<string[]>();

	useEffect(() => {
		const getThings = async () => {
			const channels = await (
				await fetch(`${localStorage["server"]}/channels?files=true`)
			).json();

			setChannels(channels);
		};

		getThings();
	}, []);

	return (
		<Paper
			component="form"
			autoComplete="off"
			onSubmit={onSubmit}
			sx={{
				display: "flex",
				flexDirection: "column",
				margin: "auto",
				width: 300,
				height: 260,
			}}
		>
			<TextField label="Name" name="name" variant="filled" required />
			<FormControl variant="filled">
				<InputLabel id="type">Type</InputLabel>
				<Select labelId="type" name="type" required>
					{channels?.map((channel) => (
						<MenuItem value={channel}>{channel}</MenuItem>
					))}
				</Select>
			</FormControl>
			<TextareaAutosize name="settings" defaultValue="{}" />
			<TextareaAutosize name="data" defaultValue="{}" />
			<Button type="submit">Save</Button>
		</Paper>
	);
}

async function onSubmit(e: FormEvent) {
	e.preventDefault();

	const formData = new FormData(e.target as HTMLFormElement);
	const data = Object.fromEntries(formData);

	data.data = JSON.parse(data.data as string);
	data.settings = JSON.parse(data.settings as string);

	const auth = await fetch(`${localStorage["server"]}/channels`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: localStorage["token"],
		},
		body: JSON.stringify(data),
	});

	const json = await auth.json();

	if (json.id) {
		console.log("success");
	}
}
