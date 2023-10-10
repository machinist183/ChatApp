import { Form, useLoaderData } from "react-router-dom";
import { getUserDetails } from "../../data/dataApi";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import axiosWithJwtInterceptor , {redirectToLogin} from "../../helpers/jwtInterceptor";
import { API_BASE_URL } from "../../config";
import { useActionData } from "react-router-dom";

export function loader({params}){
    return null
}
export async function action({request , params}){
   const formData = await request.formData()
   const oldPassword = formData.get("oldPassword")
   const newPassword = formData.get("newPassword")
   const confirmNewPassword = formData.get("confirmNewPassword")
   const userId = params["userId"]
   const jwtAxios = axiosWithJwtInterceptor()

   try {
        if (newPassword !== confirmNewPassword){
            throw {
                "response":{
                    "status":200,
                    "data":{
                        "password":"New Password and confirm new password should match"
                    }
                }}   
            }
        const response = await jwtAxios.put(
            `${API_BASE_URL}/account/${userId}/reset_password/`,
            {
                "password": newPassword ,
                "old_password": oldPassword
            },
            {
                withCredentials:true
            }
        )
        alert("Password Changed Successfully")
        return response
   } catch (error) {
        redirectToLogin(error)
        return error?.response?.data
   }
}
export default function ChangePassword(){

    const passwordChangeErrors = useActionData()
    const successfullyChangedFlag = passwordChangeErrors?.status == 200
    const [resetPasswordFormData,setResetPasswordFormData] = useState({})

   
    function handleChange(e) {
        const { name, value } = e.target
        setResetPasswordFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    return(
        <div className="w-3/5 h-3/4 m-auto translate-y-[20%]">
            <Form method="post" className=" h-full w-full flex flex-col flex-auto ">
                <div className="min-h-[10%] w-full flex flex-col justify-between mb-2">
                    <label htmlFor="oldPassword" className="font-bold text-base mb-1">Old Password</label>
                    <input type="password"
                        className="h-full w-full border-2 border-neutral-500 focus:border-neutral-800
                                   focus:border-3 outline-none focus:outline-none px-2"
                        name="oldPassword"
                        id="oldPassword"
                        placeholder="Enter Old Password"
                        value={resetPasswordFormData.oldPassword}
                        onChange={handleChange}
                    />
                    {passwordChangeErrors?.old_password &&
                     <small className=" text-red-700">{passwordChangeErrors?.old_password}</small>
                    }
                </div>
                <div className="min-h-[10%] w-full flex flex-col justify-between mb-2">
                    <label htmlFor="newPassword" className="font-bold text-base mb-1">New Password</label>
                    <input type="password"
                        className="h-full w-full border-2 border-neutral-500 focus:border-neutral-800
                                   focus:border-3 outline-none focus:outline-none px-2"
                        name="newPassword"
                        id="newPassword"
                        value={resetPasswordFormData.newPassword}
                        placeholder="Enter New Password"
                        onChange={handleChange}
                      />
                    {passwordChangeErrors?.password &&
                     <small className=" text-red-700">{passwordChangeErrors?.password}</small>
                    }
                </div>
                <div className="min-h-[10%] w-full flex flex-col justify-between mb-2">
                    <label htmlFor="confirmNewPassword" className="font-bold text-base mb-1">Confrim New Password</label>
                    <input type="password"
                        className="h-full w-full border-2 border-neutral-500 focus:border-neutral-800
                                   focus:border-3 outline-none focus:outline-none px-2"
                        name="confirmNewPassword"
                        id="confirmNewPassword"
                        placeholder="Confirm New Password"
                        value={resetPasswordFormData?.confirmNewPassword}
                        onChange={handleChange}/>
                     {passwordChangeErrors?.password &&
                     <small className=" text-red-700">{passwordChangeErrors?.password}</small>
                    }
                </div>
                <Button type='submit' className="mt-4">
                    Change Password
                </Button>
            </Form>
        </div>
       
    )
}