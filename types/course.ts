import { IDeparment } from "./department";

export type ICourse = {
    _id?: string;
    name: string;
    plan: "2008" | "2022";
    department: IDeparment | string;

    createdAt?:string;
    updatedAt?:string;
}