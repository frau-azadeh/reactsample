'use client'
import { useEffect, useState } from "react";
import{User} from "../../types/userTypes";
import { getUsers } from "@/api/userApi";

export const useFetchUsers = () => {
    const[users, setUsers]= useState<User[]>([]);
    const[loading, setLoading] = useState <boolean>(true);
    const[error, setError] = useState <string | null>(null);

    useEffect(() =>{
        const fetchData = async () =>{
            setLoading(true);
            setError(null);
        try{
            const data = await getUsers();
            setUsers(data);
        }
        catch (err){
            if(err instanceof Error){
                setError(err.message || "نمایش خطا");
            }
            else{
                setError("خطا رخ داده");
            }
        }
        finally{
            setLoading(false);
        }
        };
        fetchData();
    },[]);
    return{ users, loading, error};
}