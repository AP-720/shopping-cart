import Card from "../../components/Card/Card";
import styles from "../shop/Shop.module.css";

const productData = {
	id: 0,
	title: "Test Product",
	price: 10,
	description: "Test description",
	image: "https://placehold.co/600x400",
};

export default function Shop() {
	return (
		<div data-testid="shopContainer" className={styles.shopContainer}>
			<h1>Shop</h1>
			<div className={styles.productContainer}>
				<Card productData={productData} />
				<Card productData={productData} />
				<Card productData={productData} />
				<Card productData={productData} />
				
			</div>
		</div>
	);
}
