import styles from "../home/Home.module.css";
import heroImage from "../../src/assets/hero-background.jpg";
import ButtonLink from "../../components/ButtonLink/ButtonLink";

export default function Home() {
	return (
		<div data-testid="homeContainer" className={styles.homeContainer}>
			<div className={styles.heroContainer}>
				<img
					src={heroImage}
					alt="out of focus sunset"
					className={styles.heroImage}
				/>

				<div className={styles.heroContent}>
					<h1>Welcome</h1>
					<p>Discover our full range of products</p>
					<ButtonLink to={"/shop"}>Shop Now</ButtonLink>
				</div>
			</div>
		</div>
	);
}
