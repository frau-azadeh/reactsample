import { User } from "@/types/userTypes";
import axios from "axios";

const BAS_URL = "https://jsonplaceholder.typicode.com/users";

export const getUsers = async () : Promise <User[]> =>{
    const response = await axios.get<User[]>(BAS_URL);
    return response.data;
};