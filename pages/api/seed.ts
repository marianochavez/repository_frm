import type { NextApiRequest, NextApiResponse } from 'next'
import { db, dbSeed } from '../../database'
import Course from '../../models/Course';
import Department from '../../models/Department';
import Repository from '../../models/Repository';
import User from '../../models/User';

type Data = {
    message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    await db.connect();
    const {users, departments} = dbSeed.initialData;

    await User.deleteMany();
    await User.insertMany(users);

    await Department.deleteMany();
    await Department.insertMany(departments);

    const courses = await dbSeed.generateCourses();

    await Course.deleteMany();
    await Course.insertMany(courses);

    const repositories = await dbSeed.generateRepositories();

    await Repository.deleteMany();
    await Repository.insertMany(repositories);

    await db.disconnect();

    res.status(200).json({message: "Success seed"})
}