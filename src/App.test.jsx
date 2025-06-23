import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Home from "../pages/home/Home";
import Shop from "../pages/shop/Shop";

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
});
