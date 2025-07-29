import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { House, ShoppingCart, Store } from "lucide-react";

export default function NavBar({ cartItemCount = 0 }) {
	return (
		<nav className={styles.navBar}>
			<NavLink to="/" aria-label="Go to home page">
				<House />
			</NavLink>
			<NavLink to="/shop" aria-label="Go to shop page">
				<Store />
			</NavLink>
			<NavLink to="/cart" aria-label="View shopping cart">
				<div className={styles.cartCountContainer}>
					<ShoppingCart />{" "}
					{cartItemCount > 0 && (
						<span className={styles.cartCount}>- ({cartItemCount})</span>
					)}
				</div>
			</NavLink>
		</nav>
	);
}
