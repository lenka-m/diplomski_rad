

export async function postData(url, token, data){
    const abortController = new AbortController();
        fetch(url,{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            signal: abortController.signal
        })
        //ovde proveravamo da li ima error:
            .then(res=>{
                if(!res.ok){
                    throw Error("Nou");
                }
            })
        // ako ima error postavicemo ga: 
            .catch(err =>{
                //console.log(err.message)
                return err;
            })


}
