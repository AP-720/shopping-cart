import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import Home from "./Home";

describe("Home Page", () => {
	// Helper function to render home page and shop.
	const renderHome = () => {
		const router = createMemoryRouter([
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/shop",
				element: <div data-testid="shopContainer">Shop Content</div>,
			},
		]);
		render(
			<StrictMode>
				<RouterProvider router={router} />
			</StrictMode>
		);
	};

	it("Should render Welcome heading", () => {
		renderHome();

		expect(
			screen.getByRole("heading", { name: /Welcome/i })
		).toBeInTheDocument();
	});

	it("Should display intro paragraph", () => {
		renderHome();

		expect(
			screen.getByText("Discover our full range of products")
		).toBeInTheDocument();
	});

	it("Shoudl render hero image with correct alt text", () => {
		renderHome();

		expect(screen.getByAltText("out of focus sunset")).toBeInTheDocument();
	});

	it("Should render 'Shop now' button/link", () => {
		renderHome();

		expect(screen.getByRole("link", { name: /Shop now/i })).toBeInTheDocument();
	});

	it("Should navigate to the shop page when the 'Shop now' button/link is clicked", async () => {
		const user = userEvent.setup();
		renderHome();

		const shopLink = screen.getByRole("link", { name: /Shop now/i });

		await user.click(shopLink);

		expect(screen.getByTestId("shopContainer")).toBeInTheDocument();
	});
});
