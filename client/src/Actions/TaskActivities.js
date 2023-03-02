import axios from "axios";
import { getAll, postObject, patchObject } from "./AbstractActions";

export async function postTask(formData){
    await postObject('/tasks', formData);  
}

export async function getAllTasks(){
    return await getAll('/tasks');
}

export async function updateTaskVisibility(formData){
    await patchObject('/tasks-visibility', formData);
}