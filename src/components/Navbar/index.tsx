import { NavLink } from "react-router";
import styles from "./styles.module.css";

export default function Navbar() {
	return (
		<nav className={styles.navbar}>
			<div className={styles.buttons}>
				<button>
					<NavLink to="/services">Services</NavLink>
				</button>
				<button>
					<NavLink to="/channels">Channels</NavLink>
				</button>
			</div>
		</nav>
	);
}
