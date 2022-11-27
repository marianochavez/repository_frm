import { db } from "../";
import Department from "../../models/Department";
import { ICourse } from "../../types/course";
import { IDeparment } from "../../types/department";

const basicas: string[] = [
    "Análisis Matemático I",
    "Análisis Matemático II",
    "Algebra y Geometría Analítica",
    "Ingles A",
    "Ingles B",
    "Ingles C",
    "Ingles D",
    "Física I",
    "Física II",
    "Probabilidad y Estadística",
    "Química General",
    "Química",
    "Ingeniería y Sociedad",
    "Economía",
    "Legislación",
    "Comunicación Linguistica",
    "Introducción a los Sistemas de Gestión Gerencial",
    "Formación de Emprendedores",
    "Epistemología de la Ciencia",
    "Metodología de la Ciencia",
]

const sistemas: string[] = [
    "Matemática Discreta",
    "Sistemas y Organizaciones",
    "Algoritmos y Estructura de Datos",
    "Arquitectura de Computadoras",
    "Análisis de Sistemas",
    "Sintaxis y Semántica de los Lenguajes",
    "Paradigmas de Programación",
    "Sistemas Operativos",
    "Sistemas de Representación",
    "Diseño de Sistemas",
    "Comunicaciones",
    "Matemática Superior",
    "Gestión de Datos",
    "Redes de Información",
    "Administacion de Recursos",
    "Investigación Operativa",
    "Simulación",
    "Ingeniería de Software",
    "Teoría de Control",
    "Inteligencia Artificial",
    "Sistemas de Gestión",
]

export const coursesSeed = async () => {
    const courses: ICourse[] = [];

    await db.connect();

    const basicasDepartment: IDeparment = await Department.findOne({ name: "Básicas" }).lean();

    basicas.forEach(course => {
        courses.push({
            name: course,
            plan: "2008",
            department: basicasDepartment._id!,
        })
    })
    
    const sistemasDepartment: IDeparment = await Department.findOne({name: "Sistemas"}).lean();
    
    await db.disconnect();
    
    sistemas.forEach(course => {
        courses.push({
            name: course,
            plan: "2008",
            department: sistemasDepartment._id!,
        })
    })

    return courses;
};