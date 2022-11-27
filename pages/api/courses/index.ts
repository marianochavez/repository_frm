import type { NextApiRequest, NextApiResponse } from 'next'
import { dbCourses, dbDepartments } from '../../../database';
import { ICourse } from '../../../types/course'

type Data = {
    data: ICourse | ICourse[];
}

type DataError = {
    message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data | DataError>) {
    switch (req.method) {
        case "GET":
            return await getCourses(req, res);

        default:
            res.status(400).end(`Method Not Allowed`);
    }
}

async function getCourses(req: NextApiRequest, res: NextApiResponse<Data | DataError>) {
    const { department = "" } = req.query as { department: string }

    const departmentDb = await dbDepartments.getDepartmentByName(department);

    const courses = departmentDb ? await dbCourses.getCoursesByDepartment(departmentDb._id) : await dbCourses.getAllCourses();


    if (!courses) {
        return res.status(400).json({ message: `No hay se encontraron cursos para ${department}` })
    }

    return res.status(200).json({ data: courses });
}