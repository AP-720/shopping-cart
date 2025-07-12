import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import styles from "./App.module.css";

function App() {
	const [cartItems, setCartItems] = useState([]);

	const cartItemCount = cartItems.reduce((itemCount, item) => {
		return (itemCount += item.quantity);
	}, 0);

	function addToCart(quantity, productData) {
		setCartItems((prevItems) => {
			//  Use find() to see if the product is already in the cart.
			const existingItem = prevItems.find((item) => item.id === productData.id);

			if (existingItem) {
				// the product is already in the array, return a new array, with the quantity updated. Using map as it creates a new array so is immutable.
				return prevItems.map((item) => {
					// if the current item matches the one which already existed, spread the previous one and update the quantity, otherwise return the item unchanged.
					return item === existingItem
						? { ...existingItem, quantity: existingItem.quantity + quantity }
						: item;
				});
			} else {
				// If the product isn't already in the cart, then need to return a new array, with all the previous item objects, but with a new object added, containing the quantity and the product data.
				return [...prevItems, { quantity: quantity, ...productData }];
			}
		});
	}

	return (
		<div className={styles.appLayout}>
			<header className={styles.headerContainer}>
				<NavBar cartItemCount={cartItemCount} />
			</header>
			<main className={styles.mainContainer}>
				<Outlet context={addToCart} />
			</main>
			<footer data-testid="footer">
				<div className={styles.footerContainer}>
					<p>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit.
						Repudiandae cupiditate officiis fugiat soluta repellendus aliquid
						ducimus corrupti fugit est veniam.
					</p>
				</div>
			</footer>
		</div>
	);
}

export default App;
