import axios from 'axios';
import { ITASK } from "./types/task";


const baseUrl ="http://localhost:3000/tasks";

export const GetAllTodos = async (): Promise<ITASK> => {
    const res = await axios.get('${baseURL}/work')
    const todos = await res.data();
    return todos; 

    }