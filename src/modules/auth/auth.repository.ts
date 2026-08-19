import { prisma } from "../../config/database";
import { UserDTO, RegisterInput } from "./auth.types";

export const findUserByEmail = async (email: string): Promise<UserDTO | null> => {
  const user = await prisma.utilisateur.findUnique({ where: { email } });
  if (!user) return null;

  const userDTO: UserDTO = {
    id: user.id,
    nom: user.nom,
    prenom: user.prenom,
    email: user.email,
    password: user.password
  };

  return userDTO;
};

export const createUser = async (data: RegisterInput): Promise<UserDTO> => {
  const user = await prisma.utilisateur.create({
    data: {
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      password: data.password
    }
  });

  const userDTO: UserDTO = {
    id: user.id,
    nom: user.nom,
    prenom: user.prenom,
    email: user.email,
    password: user.password
  };

  return userDTO;
};
