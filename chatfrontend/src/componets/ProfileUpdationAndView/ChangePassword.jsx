import { Form, useLoaderData } from "react-router-dom";
import { getUserDetails } from "../../data/dataApi";
import { Button } from "@nextui-org/react";
import { useState } from "react";

export function loader({params}){
    return getUserDetails(parseInt(params.userId))
}
export async function action({request}){
    console.log(await request.formData())
    return null
}
export default function ChangePassword(){

    const userDetails = useLoaderData()

    const [userMood , setUserMood] = useState('')

    const handleMoodChange = (event) => {
        setUserMood(event.target.value)
    }
    return(
        <div className="w-3/5 h-3/4 m-auto translate-y-[20%]">
            <Form method="post" className=" h-full w-full flex flex-col flex-auto ">
                <div className="min-h-[10%] w-full flex flex-col justify-between mb-2">
                    <label htmlFor="mood" className="font-bold text-base mb-1">Old Password</label>
                    <input type="password"
                        className="h-full w-full border-2 border-neutral-500 focus:border-neutral-800
                                   focus:border-3 outline-none focus:outline-none px-2"
                        name="oldPassword"
                        id="oldPassword"
                        placeholder="Enter Old Password"
                        value={userMood}
                        onChange={handleMoodChange}/>
                </div>
                <div className="min-h-[10%] w-full flex flex-col justify-between mb-2">
                    <label htmlFor="mood" className="font-bold text-base mb-1">New Password</label>
                    <input type="password"
                        className="h-full w-full border-2 border-neutral-500 focus:border-neutral-800
                                   focus:border-3 outline-none focus:outline-none px-2"
                        name="newPassword"
                        id="newPassword"
                        value={userMood}
                        placeholder="Enter New Password"
                        onChange={handleMoodChange}/>
                </div>
                <div className="min-h-[10%] w-full flex flex-col justify-between mb-2">
                    <label htmlFor="mood" className="font-bold text-base mb-1">Confrim New Password</label>
                    <input type="password"
                        className="h-full w-full border-2 border-neutral-500 focus:border-neutral-800
                                   focus:border-3 outline-none focus:outline-none px-2"
                        name="confirmNewPassword"
                        id="confirmNewPassword"
                        placeholder="Confirm New Password"
                        value={userMood}
                        onChange={handleMoodChange}/>
                </div>
                <Button type='submit' className="mt-4">
                    Change Password
                </Button>
            </Form>
        </div>
       
    )
}