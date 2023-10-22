import { Form, useLoaderData } from "react-router-dom";
import { Button, modal } from "@nextui-org/react";
import { useState } from "react";
import axiosWithJwtInterceptor , {redirectToLogin} from "../../helpers/jwtInterceptor";
import { API_BASE_URL } from "../../config";


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
        redirectToLogin(error)
        return error
    }
}

export async function action({ request , params }) {

    const formData = await  request.formData()
    const aboutMe = formData.get("aboutme")
    const mood = formData.get("mood")
    const jwtAxios = axiosWithJwtInterceptor()
    const userId = params["userId"]
    try {
        const response = await jwtAxios.patch(
            `${API_BASE_URL}/profile/${userId}/`,
            {
                "about_me":aboutMe,
                "mood":mood
            },
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
export default function UpdateInfo(){

    const userDetails = useLoaderData()
    const [userAboutMe, setUserAboutMe] = useState(userDetails.about_me)
    const [userMood , setUserMood] = useState(userDetails.mood)

    const handleAboutMeChange = (event) => {
        setUserAboutMe(event.target.value)
    }
    const handleMoodChange = (event) => {
        setUserMood(event.target.value)
    }
    return(
        <div className="w-3/5 h-3/4  m-auto ">
            <Form method="post" className=" h-full w-full flex flex-col flex-auto ">
                <div className="min-h-[12%] w-full flex flex-col justify-between mb-2 ">
                    <label htmlFor="mood" className="font-bold text-lg mb-1">MOOD</label>
                    <input type="text"
                        className="h-full w-full text-large outline outline-1 outline-primary dark:outline-darkPrimary
                                   focus:outline-[3px] focus:shadow-box-hover dark:focus:shadow-darkBox-hover hover:outline-2
                                   px-4 shadow-box dark:shadow-darkBox bg-secondary dark:bg-darkSecondary"
                        name="mood"
                        id="mood"
                        value={userMood}
                        onChange={handleMoodChange}/>
                </div>
                <div className=" min-h-4/5 w-full flex flex-col flex-auto justify-between mb-2">
                    <label htmlFor="aboutme" className="font-bold text-lg  mb-1" >ABOUT ME</label>
                    <textarea type="text"
                        className="h-full w-full text-large outline outline-1 outline-primary dark:outline-darkPrimary
                                   focus:outline-[3px] focus:shadow-box-hover dark:focus:shadow-darkBox-hover hover:outline-2
                                   shadow-box dark:shadow-darkBox bg-secondary dark:bg-darkSecondary py-2 px-4"
                        name="aboutme"
                        id="aboutme"
                        value={userAboutMe}
                        onChange={handleAboutMeChange}
                        maxLength={100}/>
                </div>
                <Button type='submit'
                        className='font-semibold text-lg mt-2 hover:text-quarternery hover:bg-primary font-serif 
                                   text-inherit shadow-button hover:shadow-button-hover bg-quarternery
                                   dark:shadow-darkButton dark:hover:shadow-darkButton-hover
                                   dark:hover:text-darkQuarternery dark:hover:bg-darkPrimary
                                   dark:bg-darkQuarternery'>
                    Save Changes
                </Button>
            </Form>
        </div>
       
    )
}