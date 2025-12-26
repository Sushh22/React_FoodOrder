import { useCallback } from "react";
import { useEffect, useState } from "react";

async function sendHTTPrequest(url, config){
const response = await fetch(url , config);
const resData = await response.json();

if(!response.ok){
    throw new Error(resData.message || 'something went wrong');
}
return resData;
}


export default function useFetch(url,config, initialData){
    const [data ,setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    function clearData(){
        setData(initialData);
    }
    const sendRequest = useCallback(async function sendRequest(data){
        setIsLoading(true);
        try {
          const resData = await sendHTTPrequest(url,{...config , body:data});
          setData(resData);
        } catch (error) {
            setError(error.message || 'wrong')
        }
        setIsLoading(false);
    },[url,config])

    useEffect(()=>{
        if(config && (config.method === 'GET' || !config.method) || !config){
        sendRequest();
        }
    },[sendRequest, config])

    
    return{
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    }
}
