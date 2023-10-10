import { API_BASE_URL } from "../config";
import axios from "axios"

export async function register(username , email , password){
    try {
        const response = await axios.post(
            `${API_BASE_URL}/account/`,
            {
                "username":username,
                "password":password,
                "email":email
            },
            {
                withCredentials:true
            }
        )
        return response.status
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function login(username , password){
    try{
        const response = await axios.post(
            `${API_BASE_URL}/token/`,
            {
                "username":username,
                "password":password,
             
            },
            {
                withCredentials:true
            }
        )
        localStorage.setItem("user_id",response.data.user_id)
        console.log(response)
        return response.status
    }catch(error){
        console.log(error)
        return Promise.reject(error)
    }
}

export async function logout(){
    try{
        const response  = await axios.post(
            `${API_BASE_URL}/logout/`,
            {},
            {
                withCredentials:true,
            } 
        )
        return response.status
    }catch(error){
        return Promise.reject(error)
    }
}