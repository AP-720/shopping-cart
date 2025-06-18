import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import styles from "./App.module.css";

function App() {
	return (
		<div className={styles.appLayout}>
			<header className={styles.headerContainer}>
				<NavBar />
			</header>
			<main className={styles.mainContainer}>
				<Outlet />
			</main>
			<footer>
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
