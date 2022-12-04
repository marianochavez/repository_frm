import { isValidObjectId } from "mongoose";
import { db } from ".";
import Course from "../models/Course";

export async function getCoursesByDepartment(department: string) {
    await db.connect();
    const courses = await Course.find({ department }).select("name plan department _id").lean();
    await db.disconnect();

    return courses;
}

export async function getAllCourses() {
    await db.connect();
    const courses = await Course.find().select("name plan department _id").lean();
    await db.disconnect();

    return courses;
}

export async function getCourseById(id: string) {
    if (!isValidObjectId(id)) return;

    await db.connect();
    const course = await Course.findOne({ _id: id }).lean();
    await db.connect();

    return course;  
}