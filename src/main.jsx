import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import ErrorPage from "../pages/errorPage/ErrorPage.jsx";
import Home from "../pages/home/Home.jsx";
import Shop from "../pages/shop/Shop.jsx";
import Cart from "../pages/cart/Cart.jsx";

import "/styles/index.css";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "shop",
				element: <Shop />,
			},
			{
				path: "cart",
				element: <Cart />,
			},
		
		],
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
