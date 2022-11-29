import { isValidObjectId } from "mongoose";
import { db } from ".";
import Repository from "../models/Repository";

export async function getRepositoriesByUser(userId: string) {
    if (!isValidObjectId(userId)) return;

    await db.connect();
    const repositories = await Repository.find({ user: userId }).select("url course -_id").populate("course", "name plan -_id").lean();

    await db.disconnect();

    return repositories;
}

export async function getRepositoriesByCourse(courseId: string) {
    if(!isValidObjectId(courseId)) return;

    await db.connect();
    const repositories = await Repository.find({course: courseId}).lean();

    await db.disconnect();

    return repositories;
}