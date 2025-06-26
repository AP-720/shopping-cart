import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from "./Card";
import { use } from "react";

const testData = {
	id: 0,
	title: "Test Product",
	price: 10,
	description: "Test description",
	image: "http://example.com",
};

describe("Card Component", () => {
	it("Should render initial product info data", async () => {
		render(<Card productData={testData} />);

		expect(screen.getByTestId("cardContainer")).toBeInTheDocument();
		expect(screen.getByRole("heading").textContent).toMatch("Test Product");

		const image = screen.getByRole("img");
		expect(image).toHaveAttribute("src", "http://example.com");
		expect(image).toHaveAttribute("alt", "Test description");

		expect(screen.getByRole("paragraph").textContent).toMatch("£10");

		const quantityInput = await screen.getByRole("textbox");
		expect(quantityInput).toHaveValue("1");
	});

	it("Should increase quantity when plus button is clicked", async () => {
		const user = userEvent.setup();

		render(<Card productData={testData} />);

		expect(screen.getByRole("textbox")).toHaveValue("1");

		const plusButton = screen.getByRole("button", { name: "+" });

		await user.click(plusButton);

		const quantityInput = await screen.findByRole("textbox");
		expect(quantityInput).toHaveValue("2");
	});

	it("Should decrease quantity when minus button is clicked", async () => {
		const user = userEvent.setup();

		render(<Card productData={testData} />);

		expect(screen.getByRole("textbox")).toHaveValue("1");

		const plusButton = screen.getByRole("button", { name: "+" });

		await user.click(plusButton);
		await user.click(plusButton);

		const quantityInput = await screen.findByRole("textbox");
		expect(quantityInput).toHaveValue("3");

		const minusButton = screen.getByRole("button", { name: "-" });

		await user.click(minusButton);

		expect(quantityInput).toHaveValue("2");
	});

	it("Should call the onAddToCart function with correct data when 'Add to Cart' is clicked", async () => {
		const user = userEvent.setup();

		const addToCart = vi.fn();

		render(<Card productData={testData} onAddToCart={addToCart} />);

		const addToCartButton = screen.getByRole("button", { name: "Add to Cart" });

		await user.click(addToCartButton);

		expect(addToCart).toHaveBeenCalled();
		expect(addToCart).toHaveBeenCalledWith(
			{
				id: 0,
				title: "Test Product",
				price: 10,
				description: "Test description",
				image: "http://example.com",
			},
			1
		);
	});
});
