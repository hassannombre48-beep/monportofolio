import { AppError } from "../../src/shared/errors/AppError";
import * as authRepository from "../../src/modules/auth/auth.repository";
import * as authService from "../../src/modules/auth/auth.service";
import * as hash from "../../src/utils/hash";

jest.mock("../../src/modules/auth/auth.repository");
jest.mock("../../src/utils/hash");

const mockedRepository = jest.mocked(authRepository);
const mockedHash = jest.mocked(hash);

describe("auth service", () => {
	beforeEach(() => {
		jest.restoreAllMocks();
	});

	it("refuse une adresse email déjà utilisée", async () => {
		mockedRepository.findUserByEmail.mockResolvedValue({
			id: 1,
			nom: "Nom",
			prenom: "Prenom",
			email: "test@example.com",
			password: "hash"
		});

		await expect(authService.register({
			nom: "Nom",
			prenom: "Prenom",
			email: "test@example.com",
			password: "secret123"
		})).rejects.toBeInstanceOf(AppError);
		expect(mockedRepository.createUser).not.toHaveBeenCalled();
	});

	it("hash le mot de passe avant la création", async () => {
		mockedRepository.findUserByEmail.mockResolvedValue(null);
		mockedHash.hashPassword.mockResolvedValue("hashed-password");
		mockedRepository.createUser.mockResolvedValue({
			id: 1,
			nom: "Nom",
			prenom: "Prenom",
			email: "test@example.com",
			password: "hashed-password"
		});

		await authService.register({
			nom: "Nom",
			prenom: "Prenom",
			email: "test@example.com",
			password: "secret123"
		});

		expect(mockedHash.hashPassword).toHaveBeenCalledWith("secret123");
		expect(mockedRepository.createUser).toHaveBeenCalledWith(expect.objectContaining({ password: "hashed-password" }));
	});
});
