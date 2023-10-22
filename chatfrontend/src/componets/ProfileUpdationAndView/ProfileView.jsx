import { useLoaderData } from "react-router-dom"
import { useState } from "react"
import { Tabs , Tab } from "@nextui-org/react"
import { API_BASE_URL } from "../../config"
import axiosWithJwtInterceptor from "../../helpers/jwtInterceptor"

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
        console.log(error)
        return null
    }
}
export function action({request}){
    return null
}

export default function ProfileView() {
    const userDetails = useLoaderData()
    const [selectedTab , setSelectedTab] = useState('about')
    return (
        <div className="w-3/5 h-3/4 m-auto shadow-box dark:shadow-darkBox rounded-lg">
                <section id="profile_top_part "
                        className=" realtive h-[40%] w-full">
                    <div className="relative w-full h-full">
                        <img
                            src={`${userDetails.cover_pic}`}
                            className="h-full w-full  -z-10 object-fill rounded-lg"/>
                        <div className="absolute top-[95%] left-4 flex flex-row items-center -translate-y-full h-1/2 w-2/5 z-10 round-lg">
                            <img src={`${userDetails.profile_pic}`} className="w-full h-full rounded-lg"/>
                            <div className="flex flex-col justify-center ml-4 min-h-8 min-w-fit font-extrabold backdrop-blur-sm">
                                <h3 className=" text-2xl text-primary dark:text-darkPrimary font-bold">{userDetails.username}</h3>
                                <h6 className=" text-md text-tertiary dark:text-darkTertiary ">{userDetails.mood}</h6>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="userDetails" className="h-[50%]">
                    <Tabs 
                        fullWidth
                        size="md"
                        aria-label="User Description"
                        selectedKey={selectedTab}
                        onSelectionChange={setSelectedTab}
                        classNames={{
                            base:'',
                            tabList:"h-16 rounded-none bg-secondary dark:bg-darkSecondary shadow-box dark:shadow-darkBox",
                            tab:'h-full text-lg rounded-none',
                            panel:"my-1 h-4/5 pl-4 py-2",
                            cursor:"group-data-[selected=true]:bg-quarternery group-data-[selected=true]:text-tertiary\
                                    dark:group-data-[selected=true]:bg-darkQuarternery dark:group-data-[selected=true]:text-darkTertiary"
                        }}
                    >
                        <Tab key='about' title='About Me'>
                            <p>{userDetails.about_me}</p>
                        </Tab>
                        <Tab key='friends' title="Friends">
                            
                        </Tab>
                    </Tabs>
                </section>
        
        </div>
    )
}