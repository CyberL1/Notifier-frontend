import { Box, Button, TextField } from "@mui/material";

export default function Login() {
	async function onSubmit(e) {
		e.preventDefault();

		const formData = new FormData(e.target);
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
		<Box
			component="form"
			autoComplete="off"
			onSubmit={onSubmit}
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<TextField label="Server" name="server" />
			<TextField label="password" type="password" name="password" />
			<Button type="submit">Log in</Button>
		</Box>
	);
}
