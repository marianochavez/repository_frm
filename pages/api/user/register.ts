import type { NextApiRequest, NextApiResponse } from 'next'

import db from "../../../database/db";
import User from '../../../models/User';
import { IUser } from '../../../types/user';
import { isValidEmail } from '../../../utils/validations';

type Data = {
    success: boolean;
    message: string;
    user?: Omit<IUser, "_id">;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case "POST":
            return registerUser(req, res);

        default:
            res.status(405).json({ success: false, message: "Method Not Allowed" });
    }
}

async function registerUser(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { name = "", email = "" } = req.body as { name: string; email: string };

    if (!isValidEmail(email)) {
        return res.status(400).json({ success: false, message: "El email no es válido" })
    }

    await db.connect();
    const user = await User.findOne({ email });

    if (user) {
        await db.disconnect();

        return res.status(200).json({ success: false, message: "Usuario ya registrado" })
    }

    const newUser = new User({ name, email, role: "user" });

    try {
        await newUser.save({ validateBeforeSave: true });
        await db.disconnect();
    } catch (error) {
        console.log(error);
        await db.disconnect();

        return res.status(500).json({ success: false, message: "Error al registrar usuario" });
    }

    const { role } = newUser;

    res.status(200).json({ success: true, message: "Usuario creado correctamente", user: { name, email, role } })
}