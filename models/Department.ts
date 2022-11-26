import type { Model } from "mongoose";

import mongoose, { Schema, model } from "mongoose";
import { IDeparment } from "../types/department";

const departmentSchema = new Schema({
    name: { type: String, required: true, unique: true }
},
    { timestamps: true }
)

/* A way to check if the model has already been created. If it has, it will use the existing model. If
it hasn't, it will create a new model. */
const Department: Model<IDeparment> = mongoose.models.Department || model("Department", departmentSchema);

export default Department;