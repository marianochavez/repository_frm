import type { Model } from "mongoose";

import mongoose, { Schema, model } from "mongoose";
import { IRepository } from "../types/repository";

const repositorySchema = new Schema({
    url: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
},
    { timestamps: true }
)

/* A way to check if the model has already been created. If it has, it will use the existing model. If
it hasn't, it will create a new model. */
const Repository: Model<IRepository> = mongoose.models.Repository || model("Repository", repositorySchema);

export default Repository;