import { Link, Outlet, useLoaderData, useLocation ,NavLink} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCardClip , faInfo , faImage , faKey } from '@fortawesome/free-solid-svg-icons';
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
    

    function darkModeToggle(){
        setDarkMode(darkMode=>!darkMode)
    }
    let iconClasses = "text-[1.5rem] p-4"
    let tabTitleClasses = "m-4 font-bold"
    const classNameFunction = ({ isActive  }) =>
                                    [
                                    isActive ? "bg-primary text-secondary " : "",
                                    "flex flex-row flex-wrap justify-center content-center border-black rounded-md \
                                     hover:outline hover:outline-offset-2 hover:outline-primary h-full m-1"
                                    ].join("")
    return( 
            <div className="flex flex-row flex-auto ">
                <div className="ml-2 flex flex-col w-[20%] shadow-box">
                    <NavLink to="preview" className={classNameFunction}>
                        <FontAwesomeIcon icon={faIdCardClip} className={iconClasses + ""} /> 
                        <h6 className={tabTitleClasses}>Profile Preview</h6>
                    </NavLink>
                    <NavLink to="update_pictures" className={classNameFunction}>
                        <FontAwesomeIcon icon={faImage} className={iconClasses + ""} /> 
                        <h6 className={tabTitleClasses}>Update Photos</h6>
                    </NavLink>
                    <NavLink to="update_info" className={classNameFunction}>
                        <FontAwesomeIcon icon={faInfo} className={iconClasses + ""} /> 
                        <h6 className={tabTitleClasses}>Update Info</h6>
                    </NavLink>
                    <NavLink to="change_password" className={classNameFunction}>
                        <FontAwesomeIcon icon={faKey} className={iconClasses + ""} /> 
                        <h6 className={tabTitleClasses}>Change Password</h6>
                    </NavLink>
                </div>
                <Outlet className='shadow-box'/>
            </div>

    )
}
