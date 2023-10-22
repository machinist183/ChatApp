import { Tabs , Tab , Avatar , Button , Switch} from "@nextui-org/react";
import { Link,NavLink, redirect, useLoaderData } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear , faMessage ,
         faMagnifyingGlassArrowRight,
         faUserGroup,
         faLock ,
         faArrowRightFromBracket,
         faSun ,
         faMoon } from '@fortawesome/free-solid-svg-icons';
import {  useState } from "react";
import { logout } from "../services/authService";

async function handlelogout(){
    try {
        console.log("i am in logout")
        const response = await logout()
    } catch (error) {
        console.log("i am in error")
        return null
    }
}

export default function DashboardNavbar(props){
    
    const userDetails = props.userDetails
    const [darkMode , setDarkMode] = useState(false)
    let iconSize = "2xl"


    function darkModeToggle(){
        document.documentElement.classList.toggle("dark")
        setDarkMode(darkMode=>!darkMode)
    }

    const classNameFunction = ({ isActive  }) =>
                                [
                                isActive ? "bg-primary text-secondary dark:bg-darkPrimary dark:text-darkSecondary " : "",
                                "p-3 my-2 rounded-md  \
                                 hover:outline hover:outline-offset-2 hover:outline-primary dark:hover:outline-darkPrimary"
                                ].join("")

    return(
        <div className="flex flex-col justify-between items-center h-[100vh] p-3 
                        hover:shadow-2xl  shadow-button dark:shadow-darkButton ">
            <Link to="profile"
                  className="mt-8 mb-6"
                  >
                <Avatar isBordered radius="sm" src={userDetails.profile_pic} />
            </Link>

            <div className="flex flex-col h-[30%]"> 
                <NavLink to="messages" 
                           className={classNameFunction}>
                                <FontAwesomeIcon icon={faMessage}
                                                  size={iconSize} 
                                                className={ `w-full `}
                                />
                </NavLink>
                <NavLink to="explore" 
                         className={classNameFunction}>
                            <FontAwesomeIcon icon={faMagnifyingGlassArrowRight} 
                                             size={iconSize}
                                              className={ ` w-full `}
                            />
                </NavLink>
                <NavLink to="privacy"
                         className={classNameFunction}>
                            <FontAwesomeIcon icon={faLock}
                                               size={iconSize}
                                              className={ ` w-full `}
                            />
                </NavLink>
                <NavLink to="settings"
                         className={classNameFunction}>
                            <FontAwesomeIcon icon={faGear} 
                                               size={iconSize}
                                              className={ ` w-full `}
                            />
                </NavLink>
            </div>
            <div className="flex flex-col justify-around w-[100%] items-center gap-4 mb-20">
                <Button isIconOnly radius="sm" variant="light" onPress={darkModeToggle}>
                    {!darkMode ? <FontAwesomeIcon icon={faMoon}  size={iconSize} color="#"/> :
                                 <FontAwesomeIcon icon={faSun} size={iconSize} color="#ffdd00" />}
                </Button>
                <Button isIconOnly radius="sm" variant="light" onPress={handlelogout}>
                    <Link to="/login">
                        <FontAwesomeIcon icon={faArrowRightFromBracket} rotation={180} size={iconSize} />
                    </Link> 
                </Button>
            </div>
        </div>
    )
}



