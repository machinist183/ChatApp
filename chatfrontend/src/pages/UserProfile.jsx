import { Form, useLoaderData } from "react-router-dom"
import { Button, Input, Image } from "@nextui-org/react"
import { getUserDetails } from "../data/dataApi"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCamera , faXmark} from "@fortawesome/free-solid-svg-icons"
import { Tabs , Tab } from "@nextui-org/react"

export async function loader({ params }) {
    const id = params.userId
    return getUserDetails(parseInt(id))
}

export async function action({ request }) {
    console.log(await request.formData())
    return null
}

export default function UserProfile() {
    const userDetails = useLoaderData()
    const [userProfileUrl, setUserProfileUrl] = useState(userDetails.avatar)
    const [userCoverUrl, setUserCoverUrl] = useState(userDetails.cover_pic)
    const [userAboutMe, setUserAboutMe] = useState(userDetails.description)
    const [userMood , setUserMood] = useState(userDetails.mood)
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
        <div className=" w-1/2 h-4/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Form method="post"
                encType="multipart/form-data"
                className="w-full h-full flex flex-col">

                <section id="profile_top_part "
                        className=" realtive h-[40%] w-full ">
                    <div className="relative w-full h-full">
                        <img
                            src={`${userCoverUrl}`}
                            className="h-full w-full  -z-10 object-fill"/>

                        <div className={`absolute w-full top-0 z-10
                                        flex flex-row justify-end ${!isEditing && 'hidden'}`}>
                            
                                <Button isIconOnly size="lg" variant="light">
                                    <label htmlFor="coverPic"
                                            >
                                        <FontAwesomeIcon icon={faCamera} size="lg" color="white"/>
                                        <input id="coverPic" name="profilePic" type="file" accept="image/png image/jpeg" 
                                        className="hidden" onChange={handleCoverPicChange}/>
                                    </label>
                                </Button>
                            
                                <Button isIconOnly variant="light" size="lg">
                                    <label htmlFor="deleteCoverPic">
                                        <FontAwesomeIcon icon={faXmark} size="lg" color="white"/>
                                        <input id="deleteCoverPic" name="deleteCoverPic" 
                                            type="file" accept="image/png image/jpeg" 
                                            className="hidden" />
                                    </label>
                                </Button>
                        </div>
                    
                        <div className="absolute top-full -translate-y-full h-1/2 w-1/5 z-10">
                            <img src={`${userProfileUrl}`} className="w-full h-full"/>
                        
                                <div className={`absolute w-full top-0 z-10
                                                flex flex-row justify-end ${!isEditing && 'hidden'}`}>
                                    
                                        <Button isIconOnly size="sm" variant="light">
                                            <label htmlFor="profilePic"
                                                    >
                                                <FontAwesomeIcon icon={faCamera} size="sm" color="white"/>
                                                <input id="profilePic" name="profilePic" type="file" accept="image/png image/jpeg" 
                                                className="hidden" onChange={handleProfileChange}/>
                                            </label>
                                        </Button>
                                    
                                        <Button isIconOnly variant="light" size="sm">
                                            <label htmlFor="profilePic">
                                                <FontAwesomeIcon icon={faXmark} size="sm" color="white"/>
                                                <input id="deleteProfilePic" name="deleteProfilePic" 
                                                    type="file" accept="image/png image/jpeg" 
                                                    className="hidden" />
                                            </label>
                                        </Button>
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
                            <textarea readOnly={!isEditing}
                                   name="about"
                                   value={userAboutMe}
                                   onChange={handleAboutMeChange}
                                   className="bg-transparent w-full h-full text-start"/>
                        </Tab>
                        <Tab key='mood' title="Mood">
                            <textarea  readOnly={!isEditing}
                                    name="mood"
                                    value={userMood}
                                    onChange={handleMoodChange}
                                    className=" w-full h-[100%] text-start"/>
                        </Tab>
                        <Tab key='friends' title="Friends">
                            
                        </Tab>
                    </Tabs>
                </section>
                <Button type={isEditing ? 'button':'submit'}
                        onPress={toggleIsEditing}
                        className="mb-auto">
                    {isEditing ? 'Save Profile' :'Edit Profile' }
                </Button>
            </Form>
        
        </div>
    )
}