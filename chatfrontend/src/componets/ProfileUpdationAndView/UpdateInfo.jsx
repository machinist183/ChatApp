import { Form, useLoaderData } from "react-router-dom";
import { getUserDetails } from "../../data/dataApi";
import { Button } from "@nextui-org/react";
import { useState } from "react";

export function loader({params}){
    return getUserDetails(parseInt(params.userId ))
}
export async function action({request}){
    console.log(await request.formData())
    return null
}
export default function UpdateInfo(){
    const userDetails = useLoaderData()

    const [userAboutMe, setUserAboutMe] = useState(userDetails.description)
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
                <div className="min-h-[10%] w-full flex flex-col justify-between mb-2">
                    <label htmlFor="mood" className="font-bold text-base mb-1">MOOD</label>
                    <input type="text"
                        className="h-full w-full border-2 border-neutral-500 focus:border-neutral-800
                                   focus:border-3 outline-none focus:outline-none px-2"
                        name="mood"
                        id="mood"
                        value={userMood}
                        onChange={handleMoodChange}/>
                </div>
                <div className=" min-h-4/5 w-full flex flex-col flex-auto justify-between mb-2">
                    <label htmlFor="aboutme" className="font-bold text-base mb-1" >ABOUT ME</label>
                    <textarea type="text"
                        className="h-full w-full border-2 border-neutral-500 focus:border-3
                                   focus:border-neutral-800 outline-none focus:outline-none p-4"
                        name="aboutme"
                        id="aboutme"
                        value={userAboutMe}
                        onChange={handleAboutMeChange}
                        maxLength={100}/>
                </div>
                <Button type='submit' className="my-auto">
                    Save Changes
                </Button>
            </Form>
        </div>
       
    )
}