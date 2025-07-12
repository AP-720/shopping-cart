import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
	createMemoryRouter,
	MemoryRouter,
	Route,
	RouterProvider,
	Routes,
} from "react-router-dom";
import App from "./App";
import Home from "../pages/home/Home";
import Shop from "../pages/shop/Shop";
import { StrictMode, use } from "react";

describe("App component", () => {
	it("App renders NavBar, Main and footer", () => {
		render(
			<MemoryRouter initialEntries={["/"]}>
				<Routes>
					<Route path="/" element={<App />}>
						<Route index element={<Home />} />
					</Route>
				</Routes>
			</MemoryRouter>
		);

		// Tests NavBar Renders and contains link to Home
		expect(screen.getByRole("navigation")).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();

		const homeContainerDiv = screen.getByTestId("homeContainer");
		expect(homeContainerDiv).toBeInTheDocument();
		// expect(homeContainerDiv).toHaveClass("homeContainer");
		expect(screen.getByRole("heading").textContent).toMatch("Home");

		expect(screen.getByTestId("footer")).toBeInTheDocument();
	});

	it("App navigates to Shop page correctly", async () => {
		const user = userEvent.setup();

		render(
			<MemoryRouter initialEntries={["/"]}>
				<Routes>
					<Route path="/" element={<App />}>
						<Route index element={<Home />} />
						<Route path="shop" element={<Shop />} />
					</Route>
				</Routes>
			</MemoryRouter>
		);

		expect(screen.getByTestId("homeContainer")).toBeInTheDocument();
		// Use queryByTestId because the element is NOT expected to be in the document initially
		expect(screen.queryByTestId("shopContainer")).not.toBeInTheDocument();

		const shopLink = screen.getByRole("link", { name: "Shop" });

		await user.click(shopLink);

		// --- IMPORTANT: Re-query the DOM after the action ---
		// After clicking, the DOM has changed. You need to query for the new element.
		// Use findByTestId as it will wait for the element to appear (up to a default timeout).
		const shopContainer = await screen.findByTestId("shopContainer");
		expect(shopContainer).toBeInTheDocument();
		expect(screen.queryByTestId("homeContainer")).not.toBeInTheDocument();
	});

	it("Should render the correct number of products in the navbar when they are added to cart", async () => {
		const user = userEvent.setup();

		const router = createMemoryRouter([
			{
				path: "/",
				element: <App />,
				children: [{ index: true, element: <Shop /> }],
			},
		]);

		render(
			<StrictMode>
				<RouterProvider router={router} />
			</StrictMode>
		);

		await screen.findAllByTestId("shopContainer");
		expect(screen.getByText("Cart")).toBeInTheDocument();

		const plusButton = await screen.findAllByRole("button", { name: "+" });
		const addToCartButton = await screen.findAllByRole("button", {
			name: "Add to Cart",
		});

		await user.click(plusButton[0]);
		await user.click(plusButton[0]);
		await user.click(addToCartButton[0]);

		const cartDisplay = await screen.findByText("Cart - (3)")
	 	expect(cartDisplay).toBeInTheDocument();
	});
});
