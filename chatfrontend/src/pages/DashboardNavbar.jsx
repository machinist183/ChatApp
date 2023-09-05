import { Tabs , Tab , Avatar , Button , Switch} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear , faMessage ,
         faMagnifyingGlassArrowRight,
         faUserGroup,
         faLock ,
         faArrowRightFromBracket,
         faSun ,
         faMoon } from '@fortawesome/free-solid-svg-icons';
import Lottie  from "lottie-react";
import darkModeData from "../assets/lotties/darkMode.json";
import { useRef , useState } from "react";
import { SunIcon , MoonIcon } from "../componets/DarkModeIcons";

export default function DashboardNavbar(){
    let iconSize = "xl"
    const [darkMode , setDarkMode] = useState(false)

    function darkModeToggle(){
        setDarkMode(darkMode=>!darkMode)
    }
    return(
        <div className="flex flex-col justify-between items-center
                        h-[100vh] min-w-20
                         shadow-lg hover:shadow-2xl">
            <Link to="#"
                  className="mt-8 mb-6">
                <Avatar isBordered radius="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
            </Link>

            <Tabs className="w-[100%] "
                classNames={{
                tabList:'flex flex-col justify-evenly w-[100%] bg-transparent' 
            }}>
                <Tab key="chat"
                     title ={
                        <Link to="#">
                            <FontAwesomeIcon icon={faMessage} 
                                             size={iconSize}
                            />
                        </Link>
                     }
                     className="h-12"

                />   
                <Tab key="explore"
                     title ={
                        <Link to="#">
                            <FontAwesomeIcon icon={faMagnifyingGlassArrowRight}
                                               size={iconSize}
                              />
                        </Link>
                     }
                     className="h-12"

                />         
                <Tab key="friends"
                     title ={
                        <Link to="#">
                           <FontAwesomeIcon icon={faUserGroup}    size={iconSize}/>
                        </Link>
                     }
                     className="h-12"

                />
                <Tab key="privacy"
                     title ={
                        <Link to="#">
                            <FontAwesomeIcon icon={faLock}   size={iconSize} />
                        </Link>
                     }
                     className="h-12"

                /> 
                <Tab key="settings"
                     title={
                        <Link to="#">
                           <FontAwesomeIcon icon={faGear} size={iconSize} />
                        </Link>
                     }
                     className="h-12"
                />   
            </Tabs>
            <div className="flex flex-col justify-around w-[100%] items-center gap-4 mb-20">
                <Button isIconOnly radius="sm" variant="light" onPress={darkModeToggle}>
                    {!darkMode ? <FontAwesomeIcon icon={faMoon}  size={iconSize} color="#"/> :
                                 <FontAwesomeIcon icon={faSun} size={iconSize} color="#ffdd00" />}
                </Button>
                <Button isIconOnly radius="sm" variant="light">
                    <Link   className="" to="/logout">
                        <FontAwesomeIcon icon={faArrowRightFromBracket} rotation={180} size={iconSize} />
                    </Link>
                </Button>
            </div>
        </div>
    )
}



