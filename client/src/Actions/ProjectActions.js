import axios from "axios";
import { getAll, patchObject, postObject } from "./AbstractActions";


export async function createProject(formData){ 
    await postObject('/projects', formData) 
}

export async function getAllProjects(){
    return await getAll('/projects');
}

export async function updateProjectVisibility(formData){
    await patchObject('/projects-visibility', formData);
}