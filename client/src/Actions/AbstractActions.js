import axios from "axios";

const url = 'http://localhost:3001';
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