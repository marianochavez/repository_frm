import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';

import { dbCourses, dbRepositories } from '../../../database';
import { ICourse } from '../../../types/course';
import { IRepository } from '../../../types/repository';
import { IUser } from '../../../types/user';

type Data = {
    data: IRepository[] | IRepository;
}

type DataError = {
    message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data | DataError>) {
    switch (req.method) {
        case "GET":
            return await getRepositories(req, res);

        case "POST":
            return await createRepository(req, res);

        default:
            res.status(400).end(`Method Not Allowed`);
    }
}

async function getRepositories(req: NextApiRequest, res: NextApiResponse<Data | DataError>) {
    const { course = "", user = "" } = req.query as { course: string; user: string; };
    let repositories: any;

    if (user && course) {
        repositories = await dbRepositories.getRepositoriesByUserAndCourse({ userId: user, courseId: course });
    } else if (user || course) {
        repositories = await dbRepositories.getRepositoriesByUserOrCourse({ userId: user, courseId: course });
    } else {
        repositories = await dbRepositories.getAllRepositories();
    }

    if (repositories?.length === 0) {
        return res.status(400).json({ message: `No hay se encontraron repositorios` })
    }

    return res.status(200).json({ data: repositories });
}

async function createRepository(req: NextApiRequest, res: NextApiResponse<Data | DataError>) {
    const { url = "", course = "" } = req.body as { url: string; course: string; user: string };

    const session = await getSession({ req });

    if (!session) {
        return res.status(401).end(`Unauthorized`);
    }

    const courseDb = await dbCourses.getCourseById(course);

    if (!courseDb) {
        return res.status(400).json({ message: "No se encuentra un curso con ese id" });
    }

    const user = session.user._id;

    const repository = await dbRepositories.createRepository({ url, course, user });

    if (repository.message) {
        return res.status(400).json({ message: repository.message });
    }

    return res.status(200).json({ data: { _id: repository._id, url: repository.url!, user, course: courseDb } });
}