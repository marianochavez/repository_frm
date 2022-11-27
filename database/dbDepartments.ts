import { db } from ".";
import Department from "../models/Department";

export async function getAllDepartments() {
    await db.connect();

    const departments = await Department.find().select("name -_id").lean();

    await db.disconnect();

    return departments;
}

export async function getDepartmentByName(name: string) {
    await db.connect();

    const department = await Department.findOne({name}).lean();

    await db.disconnect();

    return department;
}