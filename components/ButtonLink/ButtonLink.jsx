import { Link } from "react-router-dom";
import styles from "./ButtonLink.module.css";

export default function ButtonLink({
	to,
	onClick,
	children,
	className,
	...props
}) {
	// If to provided return a link, if not a standard button.
	if (to) {
		return (
			<Link
				to={to}
				className={`${styles.buttonLink} ${className || ""}`}
				{...props}
			>
				{children}
			</Link>
		);
	} else {
		return (
			<button
				onClick={onClick}
				className={`${styles.buttonLink} ${className || ""}`}
				{...props}
			>
				{children}
			</button>
		);
	}
}
