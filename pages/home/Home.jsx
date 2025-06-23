import styles from "../home/Home.module.css";

export default function Home() {
	return (
		<div data-testid="homeContainer" className={styles.HomeContainer}>
			<h1>Home</h1>
		</div>
	);
}
