import { expect, beforeAll, afterEach, afterAll } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { server } from "/src/mocks/server.js";

expect.extend(matchers);

beforeAll(() => {
	server.listen();
});

afterEach(() => {
	server.resetHandlers();
	cleanup();
});

afterAll(() => {
	server.close();
});
