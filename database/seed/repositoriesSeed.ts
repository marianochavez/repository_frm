import { db } from "..";
import Course from "../../models/Course";
import User from "../../models/User";
import { ICourse } from "../../types/course";
import { IRepository } from "../../types/repository";
import { IUser } from "../../types/user";

const urlDocs = [
    "https://alumnosfrmutneduar-my.sharepoint.com/:f:/g/personal/mariano_chavez_alumnos_frm_utn_edu_ar/ElMbxDrGKrpHlqlEU3DIvUMB3S5hu1ToLTkZ3Ytl_XowuA?e=3mMwiG",
    "https://docs.google.com/spreadsheets/d/1jgAvtLqz8ipB9hQq45jmPxvUy515tqvEksvh9pzAmh8/edit?usp=share_link",
    "https://drive.google.com/file/d/1JBzM5OVbRq5CMWxNFXZY-VqAxrTNeCgl/view?usp=share_link",
    "https://drive.google.com/file/d/1xcH-B3fN7aJRUKFORy4pHHT060BJyHlT/view?usp=share_link",
]

export const repositoriesSeed = async() => {
    await db.connect();

    const courseDb: ICourse = await Course.findOne({name: "Análisis Matemático I"}).lean();

    const userDb:IUser = await User.findOne({email: "mariano.chavez@alumnos.frm.utn.edu.ar"}).lean();

    const repositories: IRepository[] = [];

    urlDocs.forEach(url=>{
        repositories.push({
            url,
            course: courseDb._id!,
            user: userDb._id!,
        })
    })

    return repositories;
}
