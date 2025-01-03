import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
	AppBar,
	Box,
	Button,
	Drawer,
	Icon,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from "@mui/material";
import * as Icons from "@mui/icons-material";
import { MouseEvent, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import Login from "../components/Login";
import ErrorPage from "./Error";

interface Item {
	title: string;
	icon: keyof typeof Icons;
	href: string;
}

const sidebarItems: Item[] = [
	{ title: "Services", icon: "Schedule", href: "/services" },
	{ title: "Channels", icon: "Tag", href: "/channels" },
];

const drawerWidth = 240;

function App({ error }: { error?: boolean }) {
	const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
	const isAddMenuOpen = Boolean(menuAnchor);

	const [isOpen, setOpen] = useState(false);
	const navigate = useNavigate();

	return (
		<>
			<AppBar
				position="fixed"
				sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
			>
				<Toolbar>
					<IconButton
						onClick={() => setOpen(!isOpen)}
						size="large"
						color="inherit"
						sx={{ mr: 2 }}
					>
						<Icons.Menu />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Notifier
					</Typography>
					<IconButton color="inherit" onClick={(e) => toggleMenu(e)}>
						<Icons.Add />
					</IconButton>
					<Menu
						anchorEl={menuAnchor}
						open={isAddMenuOpen}
						onClose={() => setMenuAnchor(null)}
					>
						<MenuItem onClick={() => closeMenuAndNavigate("/new/service")}>
							Servive
						</MenuItem>
						<MenuItem onClick={() => closeMenuAndNavigate("/new/channel")}>
							Channel
						</MenuItem>
					</Menu>
					<Button color="inherit" onClick={() => logOut()}>
						<Icons.Logout />
						Logout
					</Button>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				sx={{
					width: isOpen ? drawerWidth : 56,
					"& .MuiDrawer-paper": {
						width: isOpen ? drawerWidth : 56,
						overflowX: "hidden",
						transition: (theme) =>
							theme.transitions.create("width", {
								easing: theme.transitions.easing.sharp,
								duration: theme.transitions.duration.enteringScreen,
							}),
					},
				}}
			>
				<Toolbar />
				<List>
					{sidebarItems.map((item) => (
						<ListItem
							key={item.title}
							component={Link}
							to={item.href}
							disablePadding
						>
							<ListItemButton>
								<ListItemIcon>
									<Icon component={Icons[item.icon]} />
								</ListItemIcon>
								<ListItemText primary={item.title} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>
			<Toolbar />
			<Box
				component="main"
				sx={{ p: 2, marginLeft: isOpen ? "240px" : "56px" }}
			>
				{error && <ErrorPage />}
				{localStorage["server"] ? <Outlet /> : <Login />}
			</Box>
		</>
	);

	function toggleMenu(e: MouseEvent<HTMLButtonElement>) {
		setMenuAnchor(e.currentTarget);
	}

	function closeMenuAndNavigate(to: string) {
		setMenuAnchor(null);
		navigate(to);
	}
}

function logOut() {
	localStorage.clear();
	location.reload();
}

export default App;
