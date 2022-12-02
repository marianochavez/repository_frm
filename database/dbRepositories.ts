import { isValidObjectId } from "mongoose";
import { db } from ".";
import Repository from "../models/Repository";
import { IRepository } from "../types/repository";

export async function getAllRepositories() {
    await db.connect();
    const repositories = await Repository.find().lean();

    await db.disconnect();

    return repositories;
}

export async function getRepositoriesByUser(userId: string) {
    if (!isValidObjectId(userId)) return;

    await db.connect();
    const repositories = await Repository.find({ user: userId }).select("url course -_id").populate("course", "name plan -_id").lean();

    await db.disconnect();

    return repositories;
}

export async function getRepositoriesByCourse(courseId: string) {
    if (!isValidObjectId(courseId)) return;

    await db.connect();
    const repositories = await Repository.find({ course: courseId }).lean();

    await db.disconnect();

    return repositories;
}

type CreateRepoProps = {
    url: string;
    course: string;
    user: string;
}

export async function createRepository({ url, course, user }: CreateRepoProps) {
    if (!isValidObjectId(course) || !isValidObjectId(user)) return { message: "El curso y/o el usuario son incorrectos" };

    await db.connect();

    const repositoryDb = await Repository.findOne({ url });

    if (repositoryDb) {
        await db.disconnect();

        return { message: "Ya existe un repositorio con ese url" };
    }

    const newRepository = new Repository({
        url,
        course,
        user
    })

    await newRepository.save();
    await db.disconnect();

    const { _id } = newRepository;

    return { _id, url, course, user };
}