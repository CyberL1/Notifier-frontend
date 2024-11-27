import { Button, Paper, TextField } from "@mui/material";
import { FormEvent } from "react";

export default function Login() {
	async function onSubmit(e: FormEvent) {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
		const data = Object.fromEntries(formData);

		const auth = await fetch(`${data.server}/auth/callback`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});

		const json = await auth.json();

		if (json.success) {
			localStorage.setItem("server", data.server.toString());
			localStorage.setItem("token", data.password.toString());

			location.reload();
		}
	}

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
				height: 150,
			}}
		>
			<TextField
				label="Server"
				name="server"
				variant="filled"
				defaultValue={localStorage["server"]}
			/>
			<TextField
				label="password"
				type="password"
				name="password"
				variant="filled"
			/>
			<Button type="submit">Log in</Button>
		</Paper>
	);
}
