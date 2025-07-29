import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NavBar from "./NavBar";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import App from "../../src/App";
import Home from "../../pages/home/Home";
import { StrictMode } from "react";

describe("NavBar Component", () => {
	// Removed this as it was causing issues with the test passing in cart count. It caused two of everything to be rendered, so when querying it found multiple.
	// beforeEach(() => {
	// 	const router = createMemoryRouter([
	// 		{
	// 			path: "/",
	// 			element: <App />,
	// 			children: [{ index: true, element: <Home /> }],
	// 		},
	// 		{
	// 			path: "/shop",
	// 			element: <div data-testid="shopContainer"></div>,
	// 		},
	// 		{
	// 			path: "/cart",
	// 			element: <div data-testid="cartContainer"></div>,
	// 		},
	// 	]);

	// 	render(
	// 		<StrictMode>
	// 			<RouterProvider router={router} />
	// 		</StrictMode>
	// 	);
	// });

	it("Should render links to Home, Shop and Cart", () => {
		const router = createMemoryRouter([
			{
				path: "/",
				element: <App />,
				children: [{ index: true, element: <Home /> }],
			},
			{
				path: "/shop",
				element: <div data-testid="shopContainer"></div>,
			},
			{
				path: "/cart",
				element: <div data-testid="cartContainer"></div>,
			},
		]);

		render(
			<StrictMode>
				<RouterProvider router={router} />
			</StrictMode>
		);

		expect(
			screen.getByRole("link", { name: "Go to home page" })
		).toBeInTheDocument();
		expect(
			screen.getByRole("link", { name: "Go to shop page" })
		).toBeInTheDocument();
		expect(
			screen.getByRole("link", { name: "View shopping cart" })
		).toBeInTheDocument();
	});

	it("Should navigate to cart when 'Cart' link clicked", async () => {
		const user = userEvent.setup();

		const router = createMemoryRouter([
			{
				path: "/",
				element: <App />,
				children: [{ index: true, element: <Home /> }],
			},
			{
				path: "/shop",
				element: <div data-testid="shopContainer"></div>,
			},
			{
				path: "/cart",
				element: <div data-testid="cartContainer"></div>,
			},
		]);

		render(
			<StrictMode>
				<RouterProvider router={router} />
			</StrictMode>
		);

		const cartLink = screen.getByRole("link", { name: "View shopping cart" });

		await user.click(cartLink);

		const cartContainer = await screen.findByTestId("cartContainer");
		expect(cartContainer).toBeInTheDocument();
	});

	it("Should display the correct cart item count from prop passed in", () => {
		const testRouter = createMemoryRouter([
			{
				path: "/",
				element: <NavBar cartItemCount={5} />,
			},
			{
				initialEntries: "/", // Start at the path where NavBar is rendered
			},
		]);

		render(
			<StrictMode>
				<RouterProvider router={testRouter} />
			</StrictMode>
		);

		const cartLink = screen.getByRole("link", { name: "View shopping cart" });

		expect(cartLink).toHaveTextContent("(5)");
	});
});
