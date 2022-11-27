import { db } from ".";
import User from "../models/User";


export async function oauthToDBUser(oauthEmail: string, oauthName: string) {
    await db.connect();
    const user = await User.findOne({ email: oauthEmail }).lean();

    if (user) {
        await db.disconnect();
        const { _id, name, email, role } = user;

        return { _id, name, email, role };
    }

    const newUser = new User({
        email: oauthEmail,
        name: oauthName,
        role: "user",
    });

    await newUser.save();
    await db.disconnect();
    const {_id, name, email, role} = newUser;

    return {_id, name, email, role};
}