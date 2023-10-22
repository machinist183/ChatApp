import React, { useState } from "react";
import axiosWithJwtInterceptor, { redirectToLogin } from "../helpers/jwtInterceptor";
import { API_BASE_URL } from "../config";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, redirect, useLoaderData, useParams } from "react-router-dom";
import { Card , CardBody,Image,CardFooter , Divider , Avatar , Input ,Chip} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export async function loader(){
    const jwtAxios = axiosWithJwtInterceptor()
    console.log("I am inside this")
    try {
        const groupsResponse = await jwtAxios.get(`${API_BASE_URL}/groups`,
        {
            withCredentials:true,
        })
        const profilesResponse = await jwtAxios.get(`${API_BASE_URL}/profile`,
        {
            withCredentials:true,
        })
        const groupsData =  groupsResponse.data
        const profileData = profilesResponse.data
        return {groupsData , profileData}
    } catch (error) {
        redirectToLogin(error)
        return error
    }
}

export default function Explore(){
    const {groupsData , profileData} = useLoaderData()
    const [profileArray , setProfileArray] = useState(profileData)
    const [groupArray , setGroupArray] = useState(groupsData)
    const user_id = useParams()["userId"]     
    const handleUserSearch = (event) => {
        setProfileArray(profileData.filter((profileObj)=>{
            return profileObj.username.toLowerCase().includes(event.target.value.toLowerCase())
        }))
    }
    const handleGroupSearch =(event) =>{
        setGroupArray(groupsData.filter((groupObj)=>{
            return groupObj.group_name.toLowerCase().includes(event.target.value.toLowerCase())
        }))
    }
    return (
        <div className="flex flex-row w-full">
            <div className="relative p-4 h-[100vh] min-w-[20%] overflow-scroll shadow-box hover:shadow-box-hover
                            dark:shadow-darkBox dark:hover:shadow-darkBox-hover">
                <Input
                    className="sticky top-0 z-20"
                    label="Users"
                    name="userSearch"
                    onChange={handleUserSearch}
                    isClearable
                    onClear={()=>setProfileArray(profileData)}
                    radius="lg"
                    startContent= {<FontAwesomeIcon icon={faMagnifyingGlass}/>}
                    classNames={{
                        label: "text-primary dark:text-darkPrimary",
                        input: [
                            "bg-transparent",
                            "text-primary dark:text-darkPrimary text-large ml-2 ",
                            "placeholder:text-primary",
                            "dark:placeholder:text-darkPrimary"
                    
                        ],
                        inputWrapper: [
                            "shadow-xl",
                            "bg-secondary",
                            "dark:bg-darkSecondary",
                            "backdrop-blur-xl",
                            "backdrop-saturate-200",
                            "hover:bg-secondary",
                            "dark:hover:bg-darkSecondary",
                            "group-data-[focused=true]:bg-quarternery",
                            "dark:group-data-[focused=true]:bg-darkQuarternery",
                        ],
                    }}
                    placeholder="Search Users"
                />
                <ul className="flex flex-col overflow-scroll min-w-fit">
                    {profileArray.map((profile , index)=>(
                        <li className="rounded-lg hover:bg-quarternery dark:hover:bg-darkQuarternery">
                            <Link to={`/dashboard/${user_id}/messages/privatechat/${profile?.user}`}>
                                <div className="flex flex-row h-full items-center">
                                    <Avatar radius="sm" size="lg" className="m-1" src={profile?.profile_pic}/>
                                    <div className="ml-2 flex flex-col justify-start self-start">
                                        <p className="text-large font-semibold my-auto">{profile.username}</p>
                                        <p className="text-base ">{profile.mood}</p>
                                    </div>
                                </div>
                            </Link>
                        </li>
                
                    ))}
                </ul>
            </div>
             
        
            <div className="relative p-4 flex flex-col w-full h-[100vh]">
                 <Input
                    className="sticky top-0 z-20"
                    label="Groups"
                    name="groupSearch"
                    isClearable
                    onChange={handleGroupSearch}
                    onClear={()=>setGroupArray(groupsData)}
                    radius="lg"
                    startContent= {<FontAwesomeIcon icon={faMagnifyingGlass}/>}
                    classNames={{
                    label: "text-primary dark:text-darkPrimary",
                    input: [
                        "bg-transparent",
                        "text-primary dark:text-darkPrimary text-large ml-2 ",
                        "placeholder:text-primary",
                        "dark:placeholder:text-darkPrimary"
                    ],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                        "shadow-xl",
                        "bg-secondary",
                        "dark:bg-darkSecondary",
                        "backdrop-blur-xl",
                        "backdrop-saturate-200",
                        "hover:bg-secondary",
                        "dark:hover:bg-darkSecondary",
                        "group-data-[focused=true]:bg-quarternery",
                        "dark:group-data-[focused=true]:bg-darkQuarternery",
                    ],
                    }}
                    placeholder="Search Groups"
                />

                <div className="m-8 flex flex-row flex-wrap w-full">
                {groupArray.map((group, index) => (
                    <Link className="min-h-[25%] min-w-[25%] m-2 p-1 hover:bg-primary dark:hover:bg-darkPrimary rounded-2xl"
                          to={`/dashboard/${user_id}/messages/groupchat/${group?.group_name}`}>
                        <Card shadow="lg" className="" key={index} >
                            <CardBody className="overflow-visible p-0">
                            <Image
                                shadow="sm"
                                radius="lg"
                                width="100%"
                                alt={group?.group_name}
                                className="w-full object-cover h-[140px]"
                                src={group?.group_icon_pic}
                            />
                            </CardBody>
                            <CardFooter className="">
                                <b className="text-large font-semibold">{group.group_name}</b>
                            </CardFooter>
                        </Card>
                    </Link>
                    ))}
                </div>
            </div>
           
        </div>
      
        );
    
}