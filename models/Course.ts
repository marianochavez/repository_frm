import type { Model } from "mongoose";

import mongoose, { Schema, model } from "mongoose";
import { ICourse } from "../types/course";

const courseSchema = new Schema({
    name: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    plan: { type: String, required: true, default: "2008" },
},
    { timestamps: true }
)

/* A way to check if the model has already been created. If it has, it will use the existing model. If
it hasn't, it will create a new model. */
const Course: Model<ICourse> = mongoose.models.Course || model("Course", courseSchema);

export default Course;