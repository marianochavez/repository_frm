import { ICourse } from "../types/course";
import { IDeparment } from "../types/department";
import { IUser } from "../types/user"
import { coursesSeed } from "./seed/coursesSeed";
import { departmentsSeed } from "./seed/departmentsSeed";
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