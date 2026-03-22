import { UserPublic } from "../types/user.types";
type UserBase = Pick<{
    id: string;
    email: string;
    login: string;
}, "id" | "email" | "login">;
export declare function toUserPublic(user: UserBase): UserPublic;
export {};
