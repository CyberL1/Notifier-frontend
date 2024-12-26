import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	TextField,
} from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { Channel } from "../../types";

export default function NewService() {
	const [services, setServices] = useState<string[]>();
	const [channels, setChanels] = useState<Channel[]>();

	useEffect(() => {
		const getThings = async () => {
			const services = await (
				await fetch(`${localStorage["server"]}/services?files=true`)
			).json();

			const channels = await (
				await fetch(`${localStorage["server"]}/channels`)
			).json();

			setServices(services);
			setChanels(channels);
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
					{services?.map((service) => (
						<MenuItem value={service}>{service}</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl variant="filled">
				<InputLabel id="channelId">Channel</InputLabel>
				<Select labelId="channelId" name="channelId" required>
					{channels?.map((channel) => (
						<MenuItem value={channel.id}>{channel.name}</MenuItem>
					))}
				</Select>
			</FormControl>
			<TextField label="Schedule" name="schedule" variant="filled" required />
			<Button type="submit">Save</Button>
		</Paper>
	);
}

async function onSubmit(e: FormEvent) {
	e.preventDefault();

	const formData = new FormData(e.target as HTMLFormElement);
	const data = Object.fromEntries(formData);

	const auth = await fetch(`${localStorage["server"]}/services`, {
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
