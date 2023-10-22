import React from "react";
import { useParams , NavLink } from "react-router-dom";
import { Button } from "@nextui-org/react";

export default function NotFound(){
    const userId = localStorage.getItem("user_id")
    return(
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col text-center bg-primary dark:bg-darkPrimary">
            <h3>ERROR 404 - Page Not Found</h3>
            <h3>LOST ?</h3>
            <div className="flex flex-row justify-around mt-4">
                {userId &&
                 <NavLink to={`/dashboard/${userId}/explore`}>
                 <Button variant="ghost">
                     Explore
                 </Button>  
                 </NavLink>
                }
                <NavLink to='/'>
                    <Button variant="ghost">
                        Home
                    </Button>  
                </NavLink>
            </div>
        </div>
    )
}