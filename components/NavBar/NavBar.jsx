import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { House, ShoppingCart, Store } from "lucide-react";

export default function NavBar({ cartItemCount = 0 }) {
	return (
		<nav className={styles.navBar}>
			<NavLink
				to="/"
				aria-label="Go to home page"
				className={({ isActive }) => {
					return `${styles.navItem} ${isActive ? styles.activeLink : ""}`;
				}}
			>
				<House className={styles.navbarIcon} />
			</NavLink>
			<NavLink
				to="/shop"
				aria-label="Go to shop page"
				className={({ isActive }) => {
					return `${styles.navItem} ${isActive ? styles.activeLink : ""}`;
				}}
			>
				<Store className={styles.navbarIcon} />
			</NavLink>
			<NavLink
				to="/cart"
				aria-label="View shopping cart"
				className={({ isActive }) => {
					return `${styles.navItem} ${isActive ? styles.activeLink : ""}`;
				}}
			>
				<div className={styles.cartCountContainer}>
					<ShoppingCart className={styles.navbarIcon} />{" "}
					{cartItemCount > 0 && (
						<span className={(styles.cartCount)}>
							- ({cartItemCount})
						</span>
					)}
				</div>
			</NavLink>
		</nav>
	);
}
