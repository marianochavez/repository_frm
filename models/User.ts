import type { Model } from "mongoose";

import mongoose, { Schema, model } from "mongoose";
import { IUser } from "../types/user";

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
        type: String,
        enum: {
            values: ["admin", "user"],
            message: "{VALUE is not a valid role}",
            default: "user",
            required: true,
        }
    }
},
    { timestamps: true, }
)

/* A way to check if the model has already been created. If it has, it will use the existing model. If
it hasn't, it will create a new model. */
const User: Model<IUser> = mongoose.models.User || model("User", userSchema);

export default User;