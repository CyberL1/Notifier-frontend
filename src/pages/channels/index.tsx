import { Link, useLoaderData } from "react-router";
import { Channel } from "../../types";
import { Card, CardContent, CardHeader, Grid2 as Grid } from "@mui/material";

export async function Loader() {
	const channels = await fetch(`${import.meta.env.VITE_SERVER_URL}/channels`);
	const data = await channels.json();

	return data;
}

export default function Channels() {
	const channels = useLoaderData() as Channel[];

	return (
		<>
			<Grid container spacing={2}>
				{channels.map((channel) => (
					<Card
						key={channel.id}
						component={Link}
						to={`/channels/${channel.id}`}
						sx={{ width: 384, height: 150 }}
					>
						<CardHeader
							title={channel.name}
							sx={{
								textOverflow: "elipsis",
								overflow: "hidden",
								whiteSpace: "nowrap",
							}}
						/>
						<CardContent>
							Type: {channel.type}
							<br />
							Enabled? {channel.enabled ? "Yes" : "No"}
						</CardContent>
					</Card>
				))}
			</Grid>
		</>
	);
}
