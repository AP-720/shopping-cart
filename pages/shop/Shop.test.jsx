import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import Shop from "./Shop";
import { server } from "../../src/mocks/server";
import { HttpResponse } from "msw";

describe("Shop Component", () => {
	it("Should render a 'card' for each product in the data file", async () => {
		render(<Shop />);

		const productTitleOne = await screen.findByText("Test Product 1");
		const productTitleTwo = await screen.findByText("Test Product 2");

		expect(productTitleOne).toBeInTheDocument();
		expect(productTitleTwo).toBeInTheDocument();
	});

	it("Should passed down 'addToCart' function", async () => {
		const user = userEvent.setup();
		const onAddToCart = vi.fn();

		render(<Shop onAddToCart={onAddToCart} />);

		// Need to us findAllBy as there are multiple items found by that name. Also need to use 'find' when working with async things and remember to add await.
		const addToCartButton = await screen.findAllByRole("button", {
			name: "Add to Cart",
		});

		user.click(addToCartButton[0]);

		// Due to the asynchronous nature of user interactions (like clicks) and React's internal state updates/re-renders, it's possible for the mock function call to not be registered immediately after the click. `waitFor` ensures that we wait for the DOM to settle and all side effects (including the `onAddToCart` call) to complete before asserting.
		await waitFor(() => {
			expect(onAddToCart).toHaveBeenCalled();
		});
	});

	it("Should initially display loader before data has been fetched.", async () => {
		render(<Shop />);

		expect(screen.getByText("Loading")).toBeInTheDocument();

		const productTitleOne = await screen.findByText("Test Product 1");
		expect(productTitleOne).toBeInTheDocument();
		expect(screen.queryByText("Loading")).not.toBeInTheDocument();
	});
});
