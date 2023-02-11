import axios from "axios";
import { getAll, postObject } from "./AbstractActions";


export async function createProject(formData){ 
    await postObject('/projects', formData) 
}

export async function getAllProjects(){
    return await getAll('/projects');
}