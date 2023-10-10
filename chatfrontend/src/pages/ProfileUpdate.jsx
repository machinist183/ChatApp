import { Tabs , Tab , Avatar , Button , Switch} from "@nextui-org/react";
import { Link, Outlet, useLoaderData, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCardClip , faInfo , faImage , faKey } from '@fortawesome/free-solid-svg-icons';
import {  useState } from "react";
import axiosWithJwtInterceptor , {redirectToLogin} from "../helpers/jwtInterceptor";
import { API_BASE_URL } from "../config";

export async function loader({ params }) {
    const jwtAxios = axiosWithJwtInterceptor()
    const userId = params["userId"]
    try {
        const response = await jwtAxios.get(
            `${API_BASE_URL}/profile/${userId}`,
            {
                withCredentials:true,
            }
        )
        return response.data
    } catch (error) {
        redirectToLogin(error)
        return error
    }
}

export default function ProfileUpdate(props){
    
    const userDetails = useLoaderData()
    const [darkMode , setDarkMode] = useState(false)

    let iconSize = "xl"

    function darkModeToggle(){
        setDarkMode(darkMode=>!darkMode)
    }
    let iconClasses = "text-[1.5rem] p-4"
    let tabClasses = "h-full w-[100%]"
    let tabTitleClasses = "m-4 font-bold"
    let tabLinkClasses = "flex flex-row"
    return( 
            <div className="flex flex-row flex-auto">
                <Tabs className="min-w-[25%]"
                classNames={{
                tabList:'flex flex-col w-[100%] bg-transparent h-[100%]',
                }}>
                <Tab key="profilePreview"
                    title ={
                    <Link to="preview" className={tabLinkClasses}>
                        <FontAwesomeIcon icon={faIdCardClip} className={iconClasses + ""} /> 
                        <h6 className={tabTitleClasses}>Profile Preview</h6>
                    </Link>
                    }
                    className={tabClasses + " "}

                />   
                <Tab key="changePictures"
                    title ={
                    <Link to="update_pictures" className={tabLinkClasses}>
                        <FontAwesomeIcon icon={faImage} className={iconClasses + ""} /> 
                        <h6 className={tabTitleClasses}>Update Photos</h6>
                    </Link>
                    }
                    className={tabClasses + " "}

                /> 
                <Tab key="changeInfo"
                    title ={
                    <Link to="update_info" className={tabLinkClasses}>
                    <FontAwesomeIcon icon={faInfo} className={iconClasses + ""} /> 
                    <h6 className={tabTitleClasses}>Update Info</h6>
                    </Link>
                    }
                    className={tabClasses + " "}

                />   
                <Tab key="changePassword"
                    title ={
                    <Link to="change_password" className={tabLinkClasses}>
                        <FontAwesomeIcon icon={faKey} className={iconClasses + ""} /> 
                        <h6 className={tabTitleClasses}>Change Password</h6>
                    </Link>
                    }
                    className={tabClasses + " "}
                />   

                </Tabs>
                <Outlet className='border-4 border-yellow-800'/>
            </div>

    )
}
