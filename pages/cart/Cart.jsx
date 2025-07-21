import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Cart.module.css";
import { useState } from "react";

export default function Cart() {
	const { cartItems, resetCart } = useOutletContext();
	const [isProcessing, setIsProcessing] = useState(false);

	const cartPriceTotal = cartItems.reduce((itemTotal, item) => {
		return (itemTotal += item.price * item.quantity);
	}, 0);

	function handleCheckOut() {
		setIsProcessing(true);

		setTimeout(() => {
			setIsProcessing(false);
			resetCart();
		}, 2000);
	}

	return (
		<div data-testid="cartContainer" className={styles.cartContainer}>
			<h1>Cart</h1>
			{!isProcessing ? (
				cartItems.length === 0 ? (
					<>
						<p className={styles.messageContainer}>
							You have nothing in your shopping cart
						</p>
						<Link to={"/shop"} className={styles.linkButton}>
							Continue Shopping
						</Link>
					</>
				) : (
					<>
						{cartItems.map((product) => {
							return (
								<div className={styles.cartItem} key={product.id}>
									<h2 className={styles.cartItemTitle}>{product.title}</h2>
									{/* Dynamically generate the test id */}
									<p data-testid={`product-quantity-${product.id}`}>
										{product.quantity}
									</p>
									<p className={styles.cartItemPrice}>
										£{(product.quantity * product.price).toFixed(2)}
									</p>
								</div>
							);
						})}
						<div className={styles.totalContainer}>
							<h3>Total: £{cartPriceTotal.toFixed(2)}</h3>
							<button
								className={styles.linkButton}
								onClick={() => handleCheckOut()}
							>
								Check Out
							</button>
						</div>
					</>
				)
			) : (
				<div className={styles.checkoutContainer}>
					<h2>Payment processing...</h2>
					<div
						className={styles.loadingSpinner}
						data-testid="loadingSpinner"
						role="loading spinner"
					></div>
				</div>
			)}
		</div>
	);
}
