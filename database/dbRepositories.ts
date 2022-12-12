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
    const repositories = await Repository.find({ user: userId }).select("-__v").populate("course").lean();

    await db.disconnect();

    return JSON.parse(JSON.stringify(repositories));
}

export async function getRepositoriesByCourse(courseId: string) {
    if (!isValidObjectId(courseId)) return;

    await db.connect();
    const repositories = await Repository.find({ course: courseId });

    await db.disconnect();

    return repositories;
}

export async function getRepositoriesByUserAndCourse({ userId, courseId }: { userId: string; courseId: string; }) {
    if (!isValidObjectId(courseId) || !isValidObjectId(userId)) return;

    await db.connect();
    const repositories = await Repository.find({ user: userId, course: courseId }).populate("course");

    await db.disconnect();

    return repositories;
}

export async function getRepositoriesByUserOrCourse({ userId, courseId }: { userId: string; courseId: string; }) {
    if (isValidObjectId(userId)) {
        await db.connect();
        const repositories = await Repository.find({ user: userId }).populate("course");

        await db.disconnect();

        return repositories;
    } else if (isValidObjectId(courseId)) {
        await db.connect();
        const repositories = await Repository.find({ course: courseId }).populate("course");

        await db.disconnect();

        return repositories;
    }
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

    const newRepository = await Repository.create({
        url,
        course,
        user
    });
    await db.disconnect();

    const { _id, createdAt, updatedAt, } = newRepository;

    return { _id, url, user, createdAt, updatedAt };
}

export async function deleteRepository(id: string) {
    if (!isValidObjectId(id)) return;

    await db.connect();
    const deletedCount = await Repository.findOneAndDelete({ _id: id });
    await db.disconnect();

    return deletedCount;
}