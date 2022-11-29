import type { NextApiRequest, NextApiResponse } from 'next'

import { dbRepositories } from '../../../database';
import { IRepository } from '../../../types/repository';

type Data = {
    data: IRepository[];
}

type DataError = {
    message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data | DataError>) {
    switch (req.method) {
        case "GET":
            return await getRepositories(req, res);

        default:
            res.status(400).end(`Method Not Allowed`);
    }
}

async function getRepositories(req: NextApiRequest, res: NextApiResponse<Data | DataError>) {
    const { course = "" } = req.query as { course: string };

    const repositories = await dbRepositories.getRepositoriesByCourse(course);

    if (!repositories) {
        return res.status(400).json({ message: `No hay se encontraron repositorios para ${course}` })
    }

    return res.status(200).json({ data: repositories });
}