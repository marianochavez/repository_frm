import { faker } from "@faker-js/faker";

import { IUser } from "../../types/user"

export const usersSeed = () => {
    const users: IUser[] = [
        {
            name: "Mariano Chavez",
            email: "mariano.chavez@alumnos.frm.utn.edu.ar",
            role: "admin",
        },
    ];

    for (let i = 0; i < 20; i++) {
        const name = faker.name.fullName();
        users.push({
            name,
            email: name.toLocaleLowerCase().replaceAll(" ", ".") +  "@frm.utn.edu.ar",
            role: "user",
        })
    }

    return users;
}