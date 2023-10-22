import { Outlet, useLoaderData } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";
import { redirectToLogin } from "../helpers/jwtInterceptor";
import axiosWithJwtInterceptor from "../helpers/jwtInterceptor";
import { API_BASE_URL } from "../config";

export async function loader({params}){
    const jwtAxios = axiosWithJwtInterceptor()
    try {
        const userId = params["userId"]
        console.log("hi i am " + userId)
        const userResponse = await jwtAxios.get(
            `${API_BASE_URL}/profile/${userId}`,
            {
                withCredentials:true,
            })

        const userDetails = userResponse.data
  
        return userDetails
    } catch (error) {
        redirectToLogin(error)
        return error
    }
}

export default function DashboardLayout(){
    const userDetails = useLoaderData()
    
    return(
        <div className="flex flex-row h-[100vh] ">  
            <DashboardNavbar userDetails = {userDetails}/>
            <Outlet className="flex-[1 1 90%]"/>
        </div>
    )
}