import { useState } from "react";
import styles from "./Card.module.css";

export default function Card({ productData, onAddToCart }) {
	const [quantity, setQuantity] = useState(1);

	function handleIncreaseQuantity() {
		setQuantity(quantity + 1);
	}

	function handleDecreaseQuantity() {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	}

	return (
		<div
			id={productData.id}
			className={styles.cardContainer}
			data-testid="cardContainer"
		>
			<h2 className={styles.productTitle}>{productData.title}</h2>
			<img src={productData.image} alt={productData.description} />
			<p>Price: £{productData.price}</p>
			<div className={styles.quantityContainer}>
				<button onClick={handleDecreaseQuantity}>-</button>
				<input readOnly value={quantity} aria-label="Quantity" />
				<button onClick={handleIncreaseQuantity}>+</button>
			</div>
			<button
				onClick={() => {
					console.log("Add to Cart button clicked!");
					console.log("onAddToCart received:", onAddToCart);
					onAddToCart(productData, quantity);
				}}
			>
				Add to Cart
			</button>
		</div>
	);
}
