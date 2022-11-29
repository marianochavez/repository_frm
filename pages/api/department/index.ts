import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import Department from '../../../models/Department';
import { IDeparment } from '../../../types/department'

type Data = {
    data: IDeparment | IDeparment[];
}

type DataError = {
    message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data | DataError>) {
    switch (req.method) {
        case "GET":
            return await getDepartments(req,res);
    
        default:
            res.status(400).end(`Method Not Allowed`);
    }
}

async function getDepartments(req: NextApiRequest, res: NextApiResponse<Data | DataError>){
    await db.connect();
    // TODO: refactor
    const departments = await Department.find().select("name -_id").lean();

    await db.disconnect();

    if(!departments) {
        return res.status(400).json({message: "No se encontró ningún Departamento"});
    }

    res.status(200).json({data: departments})
}