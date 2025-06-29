import Card from "../../components/Card/Card";
import styles from "../shop/Shop.module.css";
import { useEffect, useState } from "react";

export default function Shop({ onAddToCart }) {
	const [productData, setProductDate] = useState([]);

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
				}
			} catch (error) {
				console.log(error);
			}
		}
		fetchProductData();
	}, []);

	return (
		<div data-testid="shopContainer" className={styles.shopContainer}>
			<h1>Shop</h1>
			<div className={styles.productContainer}>
				{productData.map((product) => {
					return (
						<Card
							key={product.id}
							productData={product}
							onAddToCart={onAddToCart}
						/>
					);
				})}
			</div>
		</div>
	);
}
