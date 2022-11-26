import { ICourse } from "./course";
import { IUser } from "./user";

export type IRepository = {
    _id: string;
    url: string;
    user: IUser | string;
    course: ICourse | string;

    createdAt?: string;
    updatedAt?: string;
}