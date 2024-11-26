import { Link, useLoaderData } from "react-router";
import { Service } from "../../types";
import { Card, CardContent, CardHeader, Grid2 as Grid } from "@mui/material";

export async function Loader() {
	const services = await fetch(`${import.meta.env.VITE_SERVER_URL}/services`);
	const data = await services.json();

	return data;
}

export default function Services() {
	const services = useLoaderData() as Service[];

	return (
		<>
			<Grid container spacing={2}>
				{services.map((service) => (
					<Card
						key={service.id}
						component={Link}
						to={`/services/${service.id}`}
						sx={{ width: 384, height: 150 }}
					>
						<CardHeader
							title={service.name}
							sx={{
								textOverflow: "elipsis",
								overflow: "hidden",
								whiteSpace: "nowrap",
							}}
						/>
						<CardContent>
							Type: {service.type}
							<br />
							Schedule: {service.schedule}
						</CardContent>
					</Card>
				))}
			</Grid>
		</>
	);
}
