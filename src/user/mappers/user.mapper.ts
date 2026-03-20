import { UserPublic } from "../types/user.types";

type UserBase = Pick<
  { id: string; email: string; login: string },
  "id" | "email" | "login"
>;

export function toUserPublic(user: UserBase): UserPublic {
  return {
    id: user.id,
    email: user.email,
    login: user.login,
  };
}
