
/*
    export async function returnAllAreas(){    
    return await useGetAllAuth('http://localhost:3001/areas', localStorage.getItem('token'));
}
*/
export async function returnAllAuth(url, token){

        fetch(url,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        //ovde proveravamo da li ima error:
            .then(res=>{
                if(!res.ok){
                    throw Error("Nou");
                }
                return res.json();
            })
        // nema error, postavi podatke:
            .then(data =>{
                //console.log(data);
                return data;
            })
        // ako ima error postavicemo ga: 
            .catch(err =>{
                console.log(err.message)
            })
}

