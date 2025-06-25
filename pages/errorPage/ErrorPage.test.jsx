import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
	createMemoryRouter,
	RouterProvider,
	ScrollRestoration,
} from "react-router-dom";
import App from "../../src/App";
import Home from "../home/Home";
import ErrorPage from "./ErrorPage";
import { StrictMode } from "react";

describe("Error Page", () => {
	beforeEach(() => {
		// To be able to use useRouteError need to create the routes using createMemoryRouter rather than just memoryRouter.
		const router = createMemoryRouter(
			[
				{
					path: "/",
					element: <App />,
					errorElement: <ErrorPage />,
					children: [{ index: true, element: <Home /> }],
				},
				{
					path: "*",
					element: <ErrorPage />,
				},
			],
			{
				initialEntries: ["/error"],
			}
		);

		render(
			<StrictMode>
				<RouterProvider router={router} />
			</StrictMode>
		);
	});

	it("Error Page renders when incorrect route", async () => {
		const errorContainer = await screen.findByTestId("errorContainer");
		expect(errorContainer).toBeInTheDocument();
	});

	it("Should navigate back to home from errorpage", async () => {
		const user = userEvent.setup();

		const homeLink = screen.getByRole("link", { name: "Home" });

		expect(homeLink).toBeInTheDocument();

		await user.click(homeLink);

		const homeContainer = await screen.findByTestId("homeContainer");
		expect(homeContainer).toBeInTheDocument();
		expect(screen.queryByTestId("errorContainer")).not.toBeInTheDocument();
	});
});
