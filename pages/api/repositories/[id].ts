import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';

import { dbRepositories } from '../../../database';
import { IRepository } from '../../../types/repository';

type Data = {
    data: IRepository[] | IRepository;
    message?: string;
}

type DataError = {
    message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data | DataError>) {
    switch (req.method) {
        case "DELETE":
            return await deleteRepository(req, res);

        default:
            res.status(400).end(`Method Not Allowed`);
    }
}

async function deleteRepository(req: NextApiRequest, res: NextApiResponse<Data | DataError>) {
    const { id = "" } = req.query as { id: string };

    const session = await getSession({ req });

    if (!session) {
        return res.status(401).end(`Unauthorized`);
    }

    const deletedRepository = await dbRepositories.deleteRepository(id);

    if (!deletedRepository) {
        return res.status(400).json({ message: `El repositorio ${id} no se pudo eliminar` });
    }

    return res.status(200).json({ data: deletedRepository })
}