# Shopping Cart Project

## Nav Bar

- [x] link to home page
- [x] Link to shop page
- [] Shopping cart icon - display how many items are in the cart.

---

## App 

- Home page acting as lay out file.
- Which imports the required components and pages. eg. Nav bar etc.

---

## Components

- **Product card**
  Each product card should include:
- [x] Product Image
- [x] Title (e.g., product name)
- [x] Quantity input field (manual input)
- [x] Increment and decrement buttons (to adjust quantity)
- [x] “Add to Cart” button

- **Shopping Cart**
- Display summary for each item in cart. Name, quantity, price per item, total price of item
- [] Total for whole cart
- [] Remove item button
- [] Check out button - Fake payment process animation, then reset cart.
- [] Will have to have some state to store whats in cart, might need to be in parent.

---

## Pages

- Home page
- Shop page
- Shopping Cart/Check out page
- Error page

---

## Misc

- [] Use Lucide for icons.
- [x] Error page
- [x] React Router in app file
- [x] Outlet for home, shop page in app file.
- [] Cart state and logic in app file.

---

## Test Coverage Guide by Component

---

### Navbar - Completed

**Purpose**: Renders nav links and cart summary

**Tests to write:**

- It renders links to "Home" and "Shop".
- It displays the correct cart item count based on props.
- The "Go to Cart" button appears and is clickable.

---

### ProductCard - Completed

**Purpose**: Lets users select quantity and add to cart

**Tests to write:**

- It displays the product title.
- Input field initializes to 1 and allows number entry.
- Increment and decrement buttons adjust the quantity correctly.
- Clicking "Add to Cart" calls the passed `addToCart` handler with the correct product and quantity.

---

### Shop - Completed

**Purpose**: Displays all product cards and passes `addToCart` down

**Tests to write:**

- It renders a `ProductCard` for each product in the data file.
- It successfully passes down the `addToCart` function (can be mocked).
- (Optional) If you're doing any loading or conditional rendering, test those paths too.

---

### Home

**Purpose**: Simple page with static content

**Tests to write:**

- It renders the expected images or text (basic smoke test).
- Navigation link (if any) works correctly.

---

### App

**Purpose**: Holds routes and cart state

**Tests to write:**

- It renders the correct page for `/` and `/shop`.
- It updates the cart count in the `Navbar` when `addToCart` is called (can simulate via `ProductCard`).
- Routing between pages works (use `MemoryRouter` for testing routes).
