import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { House, ShoppingCart, Store } from "lucide-react";

export default function NavBar({ cartItemCount = 0 }) {
	return (
		<nav className={styles.navBar}>
			<NavLink to="/">
				<House />
			</NavLink>
			<NavLink to="/shop">
				<Store />
			</NavLink>
			<NavLink to="/cart">
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
