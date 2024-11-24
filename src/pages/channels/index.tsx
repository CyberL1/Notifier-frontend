import { useLoaderData } from "react-router";
import { Channel } from "../../types";

export async function Loader() {
	const channels = await fetch(`${import.meta.env.VITE_SERVER_URL}/channels`);
	const data = await channels.json();

	return data;
}

export default function Channels() {
	const channels = useLoaderData() as Channel[];

	return channels.map((channel) => channel.name);
}
