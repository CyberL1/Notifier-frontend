import { useLoaderData } from "react-router";
import { Service } from "../../types";

export async function Loader() {
	const services = await fetch(`${import.meta.env.VITE_SERVER_URL}/services`);
	const data = await services.json();

	return data;
}

export default function Services() {
	const services = useLoaderData() as Service[];

	return services.map((service) => service.name);
}
