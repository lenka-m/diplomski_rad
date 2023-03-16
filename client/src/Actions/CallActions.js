import { postObject, searchObject } from "./AbstractActions";

export async function postCall(formData){   
    await postObject('/call', formData);
}

export async function searchCall(formData){
    return await searchObject('/call/search', formData);
}

/*
export async function searchTeams(formData){
    return await searchObject('/teams/search', formData);
} */
