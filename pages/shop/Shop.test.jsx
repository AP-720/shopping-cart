import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Shop from "./Shop";

describe("Shop Component", () => {
	it("Should render a 'card' for each product in the data file", async () => {
		render(<Shop />);

		const productTitleOne = await screen.findByText("Test Product 1");
		const productTitleTwo = await screen.findByText("Test Product 2");

		expect(productTitleOne).toBeInTheDocument();
		expect(productTitleTwo).toBeInTheDocument();
	});
});
