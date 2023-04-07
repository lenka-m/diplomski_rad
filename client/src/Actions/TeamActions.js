import { getAll, postObject, searchObject } from "./AbstractActions";


export async function postTeam(formData){
    await postObject('/teams', formData) 
}

export async function searchTeams(formData){
    return await searchObject('/teams/search', formData);
}