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
    const inputClassnames = "h-10 w-full text-large outline outline-1 outline-primary dark:outline-darkPrimary \
                             focus:outline-[3px] focus:shadow-box-hover hover:outline-2 \
                             px-4 shadow-box dark:shadow-darkBox bg-secondary dark:focus:shadow-darkBox-hover\
                             dark:bg-darkSecondary"
   
    function handleChange(e) {
        const { name, value } = e.target
        setResetPasswordFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    return(
        <div className="w-3/5 h-3/4 m-auto -translate-y-[20%] shadow-bo">
            <Form method="post" className=" h-full w-full flex flex-col justify-center">
                <div className="min-h-[10%] w-full flex flex-col justify-between mb-4">
                    <label htmlFor="oldPassword" className="font-bold text-large mb-1">OLD PASSWORD</label>
                    <input type="password"
                        className={inputClassnames}
                        name="oldPassword"
                        id="oldPassword"
                        placeholder="Enter Old Password"
                        value={resetPasswordFormData.oldPassword}
                        onChange={handleChange}
                    />
                    {passwordChangeErrors?.old_password &&
                     <small className=" text-red-700 dark:text-red-400">{passwordChangeErrors?.old_password}</small>
                    }
                </div>
                <div className="min-h-[10%] w-full flex flex-col justify-between mb-4">
                    <label htmlFor="newPassword" className="font-bold text-large mb-1">NEW PASSWORD</label>
                    <input 
                        type="password"
                        className={inputClassnames}
                        name="newPassword"
                        id="newPassword"
                        value={resetPasswordFormData.newPassword}
                        placeholder="Enter New Password"
                        onChange={handleChange}
                      />
                    {passwordChangeErrors?.password &&
                     <small className=" text-red-700 dark:text-red-400">{passwordChangeErrors?.password}</small>
                    }
                </div>
                <div className="min-h-[10%] w-full flex flex-col justify-between mb-4">
                    <label htmlFor="confirmNewPassword" className="font-bold text-large mb-1">CONFIRM NEW PASSWORD</label>
                    <input type="password"
                        className={inputClassnames}
                        name="confirmNewPassword"
                        id="confirmNewPassword"
                        placeholder="Confirm New Password"
                        value={resetPasswordFormData?.confirmNewPassword}
                        onChange={handleChange}/>
                     {passwordChangeErrors?.password &&
                     <small className=" text-red-700 dark:text-red-400">{passwordChangeErrors?.password}</small>
                    }
                </div>
                <Button type='submit' 
                        className='font-semibold text-lg mt-2
                                   shadow-button hover:shadow-button-hover
                                 hover:text-quarternery hover:bg-primary font-serif text-inherit bg-quarternery
                                   dark:shadow-darkButton dark:hover:shadow-darkButton-hover dark:hover:text-darkQuarternery
                                   dark:hover:bg-darkPrimary dark:bg-darkQuarternery '>
                    Change Password
                </Button>
            </Form>
        </div>
       
    )
}