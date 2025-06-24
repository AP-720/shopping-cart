import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import App from "../../src/App";
import Home from "../home/Home";
import ErrorPage from "./ErrorPage";
import { StrictMode } from "react";

describe("Error Page", () => {
	it("Error Page renders when incorrect route", async () => {
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

		const errorContainer = await screen.findByTestId("errorContainer");
		expect(errorContainer).toBeInTheDocument();
	});
});
