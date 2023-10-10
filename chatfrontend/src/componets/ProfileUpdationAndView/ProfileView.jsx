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
    const [userProfileUrl, setUserProfileUrl] = useState(userDetails?.profile_pic)
    const [userCoverUrl, setUserCoverUrl] = useState(userDetails?.cover_pic)
    const [userAboutMe, setUserAboutMe] = useState(userDetails?.about_me)
    const [userMood , setUserMood] = useState(userDetails?.mood)
    const [selectedTab , setSelectedTab] = useState('about')
    const [isEditing , setIsEditing] = useState(false)
 
    const toggleIsEditing = ()=>(setIsEditing(!isEditing))

    const handleProfileChange = (event) => {
        const objectUrl = URL.createObjectURL(event.target.files[0])
        setUserProfileUrl(objectUrl)
    }
    const handleCoverPicChange = (event) => {
        const objectUrl = URL.createObjectURL(event.target.files[0])
        setUserCoverUrl(objectUrl)
    }
    const handleAboutMeChange = (event) => {
        setUserAboutMe(event.target.value)
    }
    const handleMoodChange = (event) => {
        setUserMood(event.target.value)
    }
    return (
        <div className="w-3/5 h-3/4 border-4 border-black m-auto">

                <section id="profile_top_part "
                        className=" realtive h-[40%] w-full ">
                    <div className="relative w-full h-full">
                         <img
                            src={`${userCoverUrl}`}
                            className="h-full w-full  -z-10 object-fill rounded-4"/>
                        <div className="absolute top-[95%] left-4 flex flex-row -translate-y-full h-1/2 w-2/5 z-10 round-lg">
                            <img src={`${userProfileUrl}`} className="w-full h-full rounded-md"/>
                            <div className="flex flex-col justify-center ml-4 text-black font-extrabold">
                                <h3 className=" text-2xl">{userDetails.username}</h3>
                                <h6 className=" text-md font-normal text-neutral-800">{userDetails.mood}</h6>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="userDetails" className="h-[50%]">
                    <Tabs fullWidth
                    size="md"
                    aria-label="User Description"
                    selectedKey={selectedTab}
                    onSelectionChange={setSelectedTab}
                    classNames={{
                        base:'',
                        tabList:"h-16 rounded-none",
                        tab:'h-full text-lg rounded-none',
                        panel:" h-4/5"
                    }}
                    >
                        <Tab key='about' title='About Me'>
                            <p>{userAboutMe}</p>
                        </Tab>
                        <Tab key='friends' title="Friends">
                            
                        </Tab>
                    </Tabs>
                </section>
        
        </div>
    )
}