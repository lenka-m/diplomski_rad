import axios from "axios";
import { deleteObject } from "./AbstractActions";
import { getAll, patchObject, postObject } from "./AbstractActions";

export async function postActivity(formData){   
    await postObject('/activity', formData);
}

export async function updateActivity(formData){
    await patchObject('/activity', formData)  
}
export async function getAllActivities(){
    return await getAll('/activity');
}

export async function deleteActivity(activityId){
    await deleteObject('/activity', {'activityId':activityId});
}