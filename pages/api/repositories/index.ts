import type { NextApiRequest, NextApiResponse } from 'next'

import { dbRepositories } from '../../../database';
import { IRepository } from '../../../types/repository';

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
    const { course = "" } = req.query as { course: string };

    if (course) {
        const repositories = await dbRepositories.getRepositoriesByCourse(course);

        if (!repositories) {
            return res.status(400).json({ message: `No hay se encontraron repositorios para ${course}` })
        }

        return res.status(200).json({ data: repositories });
    }

    const repositories = await dbRepositories.getAllRepositories();

    return res.status(200).json({ data: repositories });
}

async function createRepository(req: NextApiRequest, res: NextApiResponse<Data | DataError>) {
    const { url = "", course = "", user = "" } = req.body as { url: string; course: string; user: string }

    const repository = await dbRepositories.createRepository({ url, course, user });

    if (repository.message) {
        return res.status(400).json({ message: repository.message });
    }

    return res.status(200).json({ data: (repository as IRepository) });
}