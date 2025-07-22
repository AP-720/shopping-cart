import { describe, it, expect, vi,} from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider, Outlet } from "react-router-dom";
import Cart from "./Cart";
import { act, StrictMode } from "react";

// Minimal wrapper component that acts as the parent route
// and provides the context that Shop expects.
function TestOutletWrapper({ cartItems, resetCart }) {
	return <Outlet context={{ cartItems, resetCart }} />;
}

describe("Cart Component", () => {
	it("Should show continue shopping message if cart empty", () => {
		const mockEmptyCart = [];
		const mockResetCart = vi.fn();

		const router = createMemoryRouter([
			{
				path: "/",
				element: (
					<TestOutletWrapper
						cartItems={mockEmptyCart}
						resetCart={mockResetCart}
					/>
				),
				children: [{ index: true, element: <Cart /> }],
			},
		]);

		render(
			<StrictMode>
				<RouterProvider router={router} />
			</StrictMode>
		);

		const emptyCartMessage = screen.getByText(
			"You have nothing in your shopping cart"
		);
		const continueShoppingButton = screen.getByRole("link", {
			name: "Continue Shopping",
		});

		expect(emptyCartMessage).toBeInTheDocument();
		expect(continueShoppingButton).toBeInTheDocument();
	});

	it("Should render all the items in the cart", async () => {
		const mockCart = [
			{
				id: 1,
				title: "Test Product 1",
				price: 10,
				quantity: 1,
			},
			{
				id: 2,
				title: "Test Product 2",
				price: 15.99,
				quantity: 2,
			},
		];

		const mockResetCart = vi.fn();

		const router = createMemoryRouter([
			{
				path: "/",
				element: (
					<TestOutletWrapper cartItems={mockCart} resetCart={mockResetCart} />
				),
				children: [{ index: true, element: <Cart /> }],
			},
		]);

		render(
			<StrictMode>
				<RouterProvider router={router} />
			</StrictMode>
		);

		const productTitleOne = await screen.findByText("Test Product 1");
		const productPriceOne = await screen.findByText("£10.00");
		const productQuantityOne = await screen.findByTestId("product-quantity-1");
		const productTitleTwo = await screen.findByText("Test Product 2");
		const productPriceTwo = await screen.findByText("£31.98");
		const productQuantityTwo = await screen.findByTestId("product-quantity-2");
		const totalPrice = await screen.findByText("Total: £41.98");

		expect(productTitleOne).toBeInTheDocument();
		expect(productPriceOne).toBeInTheDocument();
		expect(productQuantityOne).toHaveTextContent(1);
		expect(productTitleTwo).toBeInTheDocument();
		expect(productPriceTwo).toBeInTheDocument();
		expect(productQuantityTwo).toHaveTextContent(2);
		expect(totalPrice).toBeInTheDocument();
	});

	it("Should navigate shop page when 'continue shopping' button is clicked.", async () => {
		const user = userEvent.setup();
		const mockEmptyCart = [];
		const mockResetCart = vi.fn();

		const router = createMemoryRouter([
			{
				path: "/",
				element: (
					<TestOutletWrapper
						cartItems={mockEmptyCart}
						resetCart={mockResetCart}
					/>
				),
				children: [
					{ index: true, element: <Cart /> },
					{ path: "/shop", element: <div data-testid="shopContainer"></div> },
				],
			},
		]);

		render(
			<StrictMode>
				<RouterProvider router={router} />
			</StrictMode>
		);

		const continueShoppingButton = screen.getByRole("link", {
			name: "Continue Shopping",
		});

		await user.click(continueShoppingButton);

		const shopContainer = await screen.findByTestId("shopContainer");
		expect(shopContainer).toBeInTheDocument();
	});

	it("Should clear cart and display empty message when 'Check Out' button is clicked", async () => {
		const user = userEvent.setup();

		// Mock cart data
		let currentCartItems = [
			{ id: 1, title: "Test Product 1", price: 10, quantity: 1 },
			{ id: 2, title: "Test Product 2", price: 15.99, quantity: 2 },
		];

		let router;
		let rerender;

		//  Mocking the resetCart Function's Behavior
		const mockResetCart = vi.fn(() => {
			// Replicates clearing the cart data.
			currentCartItems = [];
			// Using rerender to simulate the rerendering of the component that would normally happen when state changes
			rerender(
				<StrictMode>
					<RouterProvider
						router={createMemoryRouter([
							{
								path: "/",
								element: (
									<TestOutletWrapper
										cartItems={currentCartItems}
										resetCart={mockResetCart}
									/>
								),
								children: [{ index: true, element: <Cart /> }],
							},
						])}
					/>
				</StrictMode>
			);
		});

		// Initial Router Setup
		router = createMemoryRouter([
			{
				path: "/",
				element: (
					<TestOutletWrapper
						cartItems={currentCartItems}
						resetCart={mockResetCart}
					/>
				),
				children: [{ index: true, element: <Cart /> }],
			},
		]);

		// Initial Render of the Component
		const renderResult = render(
			<StrictMode>
				<RouterProvider router={router} />
			</StrictMode>
		);
		rerender = renderResult.rerender;

		const checkoutButton = screen.getByRole("button", {
			name: "Check Out",
		});

		// Simulate clicking the button.
		// This will trigger handleCheckOut() in Cart.jsx, which:
		// a) Sets isProcessing to true (immediate UI update).
		// b) Schedules the setTimeout for 2000ms.
		// Wrap user.click in act because it triggers state updates.
		await act(async () => {
			await user.click(checkoutButton);
		});

		// --- ASSERTIONS FOR IMMEDIATE PROCESSING STATE ---
		// Verify that the "Payment processing..." message and loading spinner appear immediately.
		// Use getBy* as these should be synchronously present after the click.
		const processingMessage = screen.getByText("Payment processing...");
		const loadingSpinner = screen.getByTestId("loadingSpinner");

		expect(processingMessage).toBeInTheDocument();
		expect(loadingSpinner).toBeInTheDocument();

		// --- ASSERTIONS FOR FINAL (CLEARED CART) STATE AFTER DELAY ---
		// Use waitFor to wait for the asynchronous setTimeout to complete
		// and for the UI to update. The default timeout for waitFor is usually 1000ms, so increase it to be sure it covers the 2000ms setTimeout.
		await waitFor(
			async () => {
				// Verify that mockResetCart was called after the timeout.
				expect(mockResetCart).toHaveBeenCalled();

				// Verify that the processing message and spinner are no longer in the document.
				expect(
					screen.queryByText("Payment processing...")
				).not.toBeInTheDocument();
				expect(screen.queryByTestId("loadingSpinner")).not.toBeInTheDocument();

				// Verify that the "You have nothing in your shopping cart" message and
				// "Continue Shopping" button are now displayed.
				// Use getBy* here because waitFor will ensure they are present when assertions run.
				expect(
					screen.getByRole("link", { name: "Continue Shopping" })
				).toBeInTheDocument();
				expect(
					screen.getByText("You have nothing in your shopping cart")
				).toBeInTheDocument();
			},
			{ timeout: 3000 } // Set timeout slightly longer than the 2000ms setTimeout
		);
	}, 3000); // Keep test timeout high enough to cover waitFor's timeout
});
