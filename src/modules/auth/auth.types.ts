export interface RegisterInput {
  nom: string;
  prenom: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface UserDTO {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  password: string;
}

export interface TokenPayload {
  userId: number;
}
