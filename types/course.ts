import { IDeparment } from "./department";

export type Plan = {
    year: "2008" | "2022";
}

export type ICourse = {
    _id: string;
    name: string;
    plan: Plan;
    department: IDeparment | string;

    createdAt?:string;
    updatedAt?:string;
}