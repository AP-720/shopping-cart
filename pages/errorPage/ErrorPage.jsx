import { Link, useRouteError } from "react-router-dom";
import styles from "../errorPage/ErrorPage.module.css";
import ButtonLink from "../../components/ButtonLink/ButtonLink";

export default function ErrorPage() {
	const error = useRouteError();
	console.error(error);

	return (
		<div data-testid="errorContainer" className={styles.errorContainer}>
			<h1 className={styles.errorTitle}>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				Click to go back{" "}
				<Link className={styles.errorLink} to={"/"}>
					Home
				</Link>
			</p>
			<p>
				<i>{error && error.date ? error.data : "Page Not Found"}</i>
			</p>
		</div>
	);
}
