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
    "http://mohr.com/doloribus-at-nulla-provident-voluptate-nam.html",
    "http://schneider.com/",
    "https://www.runolfsdottir.com/necessitatibus-corrupti-minima-similique-iure-consequatur",
    "http://www.hermann.com/qui-sapiente-autem-accusantium-velit.html",
    "https://fay.com/deserunt-reiciendis-quas-ut-similique-necessitatibus.html",
    "http://wolf.com/",
    "https://www.bashirian.info/repellat-tempore-molestiae-consequatur",
    "http://www.stamm.org/consequuntur-ab-cupiditate-earum",
    "https://www.blick.biz/quam-aliquam-non-voluptas-quia",
    "http://www.casper.biz/magnam-vel-autem-doloribus-enim-molestiae-labore-occaecati.html",
];

export const repositoriesSeed = async () => {
    await db.connect();

    const courseDb: ICourse = await Course.findOne({ name: "Análisis Matemático I" }).lean();

    const userDb: IUser = await User.findOne({ email: "mariano.chavez@alumnos.frm.utn.edu.ar" }).lean();

    const repositories: IRepository[] = [];

    urlDocs.forEach(url => {
        repositories.push({
            url,
            course: courseDb._id!,
            user: userDb._id!,
        })
    })

    return repositories;
}
