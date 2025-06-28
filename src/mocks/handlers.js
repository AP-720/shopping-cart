import { http, HttpResponse } from "msw";

export const handlers = [
	http.get("https://fakestoreapi.com/products", () => {
		return HttpResponse.json(
			[
				{
					id: 0,
					title: "Test Product 1",
					price: 10,
					description: "Test Product 1 Description",
					image: "https://placehold.co/600x400",
				},
				{
					id: 1,
					title: "Test Product 2",
					price: 20,
					description: "Test Product 2 Description",
					image: "https://placehold.co/600x400",
				},
			],
			{ status: 200 }
		);
	}),
];
