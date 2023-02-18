import axios from "axios";
import { deleteObject, searchObject } from "./AbstractActions";
import { getAll, patchObject, postObject } from "./AbstractActions";

export async function postActivity(formData){   
    await postObject('/activity', formData);
}

export async function getAllActivities(){
    return await getAll('/activity');
}

export async function deleteActivity(activityId){
    await deleteObject('/activity', {'activityId':activityId});
}

export async function EditorPatchActivity(formData){
    await patchObject('/patch-activity', formData);
}

export async function adminPatchActivity(formData){
    await patchObject('/activity-final', formData);
}

export async function searchActivity(formData){
    return await searchObject('/activity/search', formData);
}