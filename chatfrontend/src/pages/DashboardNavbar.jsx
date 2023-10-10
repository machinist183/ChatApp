import { Tabs , Tab , Avatar , Button , Switch} from "@nextui-org/react";
import { Link, redirect, useLoaderData } from "react-router-dom";
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

async function loader(){
    return null
}

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
    let iconSize = "xl"

    function darkModeToggle(){
        setDarkMode(darkMode=>!darkMode)
    }
    let iconClasses = "text-[1.5rem]"
    let tabClasses = "h-16"
    return(
        <div className="flex flex-col justify-between items-center
                        h-[100vh] min-w-20
                         shadow-lg hover:shadow-2xl">
            <Link to="profile"
                  state={{'userdata': userDetails}}
                  className="mt-8 mb-6"
                  >
                <Avatar isBordered radius="sm" src={userDetails.avatar} />
            </Link>

            <Tabs className="w-[100%] "
                classNames={{
                tabList:'flex flex-col justify-evenly w-[100%] bg-transparent' 
            }}>
                <Tab key="chat"
                     title ={
                        <Link to="messages">
                            <FontAwesomeIcon icon={faMessage} 
                                             className={iconClasses + " "}
                            />
                        </Link>
                     }
                     className={tabClasses + " "}

                />   
                <Tab key="explore"
                     title ={
                        <Link to="#">
                            <FontAwesomeIcon icon={faMagnifyingGlassArrowRight}
                                             className={iconClasses + " "}
                              />
                        </Link>
                     }
                     className={tabClasses + " "}

                />         
                <Tab key="friends"
                     title ={
                        <Link to="#">
                           <FontAwesomeIcon icon={faUserGroup} 
                                            className={iconClasses + " "}
                            />
                        </Link>
                     }
                     className={tabClasses + " "}

                />
                <Tab key="privacy"
                     title ={
                        <Link to="#">
                            <FontAwesomeIcon icon={faLock}   
                                             className={iconClasses + " "}
                             />
                        </Link>
                     }
                     className={tabClasses + " "}

                /> 
                <Tab key="settings"
                     title={
                        <Link to="#">
                           <FontAwesomeIcon icon={faGear} 
                                            className={iconClasses + " "} />
                        </Link>
                     }
                     className={tabClasses + " "}
                />   
            </Tabs>
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



