
import { Outlet, useLoaderData } from "react-router-dom";
import { Tab , Tabs ,Chip, Button} from "@nextui-org/react";
import { Link } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";
import { getUserDetails } from "../data/dataApi";

export function loader({params}){
    console.log(`Params Id = ${params.userId}`)
    return getUserDetails(2)
}

export default function DashboardLayout(){
    const userDetails = useLoaderData()
    
    return(
        <div className="flex flex-row h-[100vh]">  
            <DashboardNavbar userDetails = {userDetails}/>
            <Outlet className="flex-[25 1 90%]"/>
        </div>
    )
}