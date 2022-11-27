export type IUser = {
    _id?: string;
    name: string;
    email: string;
    role: "user" | "admin";

    createdAt?: string;
    updatedAt?: string;
}