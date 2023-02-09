import { useState, useEffect } from "react";

const useGetAll = (url) =>{
    const [data,setData] = useState(null);
    const [error,setError] = useState(null);
    const [isPending,setIsPending] = useState(true);
    
    useEffect(() =>{
        fetch(url)
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
                setError(null);
                setData(data);
                setIsPending(false)
            })
        // ako ima error postavicemo ga: 
            .catch(err =>{
                //console.log(err.message)
                setError(err.message);
                setIsPending(false);
            })
    }, [url]);


    return {data, isPending, error}
}

export default useGetAll;