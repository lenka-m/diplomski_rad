import axios from "axios";

const url = 'http://localhost:3001';
const token = localStorage.getItem('token');
const instance = axios.create({
    baseURL: `${url}`,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'PATCH',//Access-Control-Allow-Methods
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Headers': 'Authorization, Content-Type, Access-Control-Allow-Headers',
    },
});

export function getInstance() {
    const token = localStorage.getItem('token');
    return axios.create({
      baseURL: url,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }

export async function getAll(path){
    const instance = getInstance();
    const res = await instance.get(path);
    return res.data;
}
export async function searchObject(path, formData) {
  const instance = getInstance();
  const res = await instance.get(path, { params: formData });
  return res.data;
}

export async function deleteObject(path, formData) {
  const instance = getInstance();
  console.log('pozvan deleteObject');
  await instance.delete(path, { data: formData });
}

export async function postObject(path, formData){
  console.log(formData)
    const instance = getInstance();
    await instance.post(path, formData);
}

export async function patchObject(path, formData){
  const instance = getInstance();
  return await instance.patch(path,{data: formData});
}

export async function uploadPic(path, formData){
  const instance = getInstance();
  return await instance.patch(path,{data: formData});
}