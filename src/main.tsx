import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Services, { Loader as ServicesLoader } from "./pages/services/index.tsx";
import Channels, { Loader as ChannelsLoader } from "./pages/channels/index.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/services",
				element: <Services />,
				loader: ServicesLoader,
			},
			{
				path: "/channels",
				element: <Channels />,
				loader: ChannelsLoader,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
