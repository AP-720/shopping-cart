import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import styles from "../shop/Shop.module.css";

export default function Shop() {
	const [productData, setProductDate] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const {addToCart} = useOutletContext();

	useEffect(() => {
		async function fetchProductData() {
			const url = "https://fakestoreapi.com/products";

			try {
				const response = await fetch(url);

				const data = await response.json();

				if (!response) {
					throw new Error("Failed to fetch product data.");
				} else {
					setProductDate(
						data.map((product) => {
							return {
								id: product.id,
								title: product.title,
								price: product.price,
								description: product.description,
								image: product.image,
							};
						})
					);
					setIsLoading(false);
				}
			} catch (error) {
				console.log(error);
			}
		}
		fetchProductData();
	}, []);

	return (
		<div data-testid="shopContainer" className={styles.shopContainer}>
			<h1 className={styles.shopTitle}>Shop</h1>
			<div className={styles.productContainer}>
				{isLoading ? (
					<div className={styles.loadingContainer}>
						<h2>Loading</h2>
						<div className={styles.loadingSpinner}></div>
					</div>
				) : (
					productData.map((product) => {
						return (
							<Card
								key={product.id}
								productData={product}
								onAddToCart={addToCart}
							/>
						);
					})
				)}
			</div>
		</div>
	);
}
