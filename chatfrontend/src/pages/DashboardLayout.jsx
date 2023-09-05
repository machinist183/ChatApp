
import { Outlet } from "react-router-dom";
import { Tab , Tabs ,Chip, Button} from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import DashboardNavbar from "./DashboardNavbar";
export default function DashboardLayout(){
    return(
        <div className="flex flex-row ">  
            <DashboardNavbar/>
            <Outlet className="flex-[25 1 90%]"/>
        </div>
    )
}