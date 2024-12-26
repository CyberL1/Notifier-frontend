import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Services, { Loader as ServicesLoader } from "./pages/services/index.tsx";
import Channels, { Loader as ChannelsLoader } from "./pages/channels/index.tsx";
import Service, { Loader as ServiceLoader } from "./pages/services/[id].tsx";
import NewService from "./pages/new/service.tsx";
import NewChannel from "./pages/new/channel.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <App error />,
		children: [
			{
				path: "/services",
				element: <Services />,
				loader: ServicesLoader,
			},
			{
				path: "/services/:id",
				element: <Service />,
				loader: ServiceLoader,
			},
			{
				path: "/channels",
				element: <Channels />,
				loader: ChannelsLoader,
			},
			{ path: "/new/service", element: <NewService /> },
			{ path: "/new/channel", element: <NewChannel /> },
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
