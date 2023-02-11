import axios from "axios";
import { getAll, postObject } from "./AbstractActions";


export async function postTeam(formData){
    await postObject('/teams', formData) 
}

export async function getAllTeams(){
    return getAll('/teams');
}