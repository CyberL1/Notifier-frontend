import { LoaderFunctionArgs, useLoaderData } from "react-router";
import type { Service } from "../../types";
import { Button, Paper, TextField } from "@mui/material";
import { FormEvent } from "react";

export async function Loader({ params }: LoaderFunctionArgs) {
	if (localStorage["server"]) {
		const service = await fetch(
			`${localStorage["server"]}/services/${params.id}`,
			{
				headers: { Authorization: localStorage["token"] },
			},
		);

		const data = await service.json();
		return data;
	}
}

export default function ServicePage() {
	const service = useLoaderData() as Service & { error: string };

	if (service.error) return "Service not found";

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
			<TextField
				label="Name"
				name="name"
				variant="filled"
				defaultValue={service.name}
				required
			/>
			<TextField
				label="Type"
				name="type"
				variant="filled"
				defaultValue={service.type}
				required
			/>
			<TextField
				label="Channel ID"
				name="channelId"
				variant="filled"
				defaultValue={service.channelId}
				required
			/>
			<TextField
				label="Schedule"
				name="schedule"
				variant="filled"
				defaultValue={service.schedule}
				required
			/>
			<Button type="submit">Save</Button>
		</Paper>
	);
}

async function onSubmit(e: FormEvent) {
	e.preventDefault();

	const formData = new FormData(e.target as HTMLFormElement);
	const data = Object.fromEntries(formData);

	const auth = await fetch(`${localStorage["server"]}${location.pathname}`, {
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
