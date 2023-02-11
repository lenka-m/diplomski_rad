import axios from "axios";
import { getAll, postObject } from "./AbstractActions";

export async function postTask(formData){
    await postObject('/tasks', formData);  
}

export async function getAllTasks(){
    return await getAll('/tasks');
}
