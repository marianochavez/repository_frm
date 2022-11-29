import { ICourse } from "../types/course";
import { IDeparment } from "../types/department";
import { IRepository } from "../types/repository";
import { IUser } from "../types/user"
import { coursesSeed } from "./seed/coursesSeed";
import { departmentsSeed } from "./seed/departmentsSeed";
import { repositoriesSeed } from "./seed/repositoriesSeed";
import { usersSeed } from "./seed/usersSeed";

type SeedData = {
    users: IUser[];
    departments: IDeparment[];
}

export const initialData: SeedData = {
    users: usersSeed(),
    departments: departmentsSeed,
}

export const generateCourses = async(): Promise<ICourse[]> => await coursesSeed();

export const generateRepositories = async(): Promise<IRepository[]> => await repositoriesSeed();