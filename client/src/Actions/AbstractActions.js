import axios from "axios";

const url = 'http://localhost:3001';
const token = localStorage.getItem('token');
const instance = axios.create({
    baseURL: `${url}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
});

export async function getAll(path){
    const res = await instance.get(path);
    return await res.data;
}
export async function searchObject(path, formData){
    const res = await instance.get(`${path}`, {params: formData });
    return res.data;
}

export async function postObject(path, formData){
    await instance.post(`${path}`,formData );
}

export async function patchObject(path, formData){
    await instance.patch(`${path}`, formData)
}
