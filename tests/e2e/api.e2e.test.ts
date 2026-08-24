import request from "supertest";
import app from "../../src/app";

describe("API E2E", () => {
	it("expose un endpoint de santé", async () => {
		const response = await request(app).get("/health");

		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			success: true,
			status: "ok",
			message: "API opérationnelle"
		});
	});
});
