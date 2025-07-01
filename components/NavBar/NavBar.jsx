import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

export default function NavBar({ cartItemCount = 0 }) {
	return (
		<nav className={styles.navBar}>
			<NavLink to="/">Home</NavLink>
			<NavLink to="/shop">Shop</NavLink>
			<NavLink to="/cart">
				{cartItemCount > 0 ? `Cart - (${cartItemCount})` : "Cart"}
			</NavLink>
		</nav>
	);
}
