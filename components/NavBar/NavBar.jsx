import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css"

export default function NavBar() {
	return (
		<nav className={styles.navBar}>
			<NavLink to="/">Home</NavLink>
			<NavLink to="/shop">Shop</NavLink>
			<NavLink to="/cart">Cart</NavLink>
		</nav>
	);
}
