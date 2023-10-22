import React from "react"
import { useParams, useRouteError , NavLink} from "react-router-dom"
import { Button } from "@nextui-org/react"

export default function Error() {
    const error = useRouteError()
    const userId = localStorage.getItem("user_id")
    return (
        <>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col text-center">
            <h3>ERROR 500 - Some Server Error</h3>
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
        </>
    )
}