import request from "supertest";
import app from "../../src/app";
import * as authRepository from "../../src/modules/auth/auth.repository";

jest.mock("../../src/modules/auth/auth.repository");

const mockedRepository = jest.mocked(authRepository);

describe("auth API", () => {
	it("valide les données invalides à l'inscription", async () => {
		const response = await request(app)
			.post("/api/v1/auth/register")
			.send({ nom: "A", prenom: "B", email: "invalid", password: "123" });

		expect(response.status).toBe(400);
		expect(mockedRepository.createUser).not.toHaveBeenCalled();
	});

	it("crée un utilisateur valide", async () => {
		mockedRepository.findUserByEmail.mockResolvedValue(null);
		mockedRepository.createUser.mockResolvedValue({
			id: 1,
			nom: "Hassan",
			prenom: "Nombre",
			email: "hassan@example.com",
			password: "hashed-password"
		});

		const response = await request(app)
			.post("/api/v1/auth/register")
			.send({ nom: "Hassan", prenom: "Nombre", email: "hassan@example.com", password: "secret123" });

		expect(response.status).toBe(201);
		expect(response.body.user).toMatchObject({ email: "hassan@example.com" });
	});
});
