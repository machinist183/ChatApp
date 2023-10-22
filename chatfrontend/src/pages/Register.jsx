import {Form, redirect, useActionData} from 'react-router-dom'
import {Input , Button  } from "@nextui-org/react"
import { register } from '../services/authService'

export async function registerAction({request}){
    try {
        const formData = await request.formData()
        const username = formData.get("username")
        const email = formData.get("email")
        const password = formData.get("password")
        const confirmPassword = formData.get("confirmPassword")
        if (password !== confirmPassword){
            throw {
                "type": "unmatchingPassword",
                "response":{
                    "status":400,
                    "statusText":"Custome unmatching password error",
                    "data":{
                        "password":"Password and Confirm Password should match"
                    }
                }}
            }
        const response = await register(username , email, password)
        alert("Your account has been successfully created")
        return redirect("/login/?message=Your account has been successfully created")
        }
        catch(registerError){
            const error = registerError.response
            const errorResponse = {
                "statusText": error?.statusText,
                "status":error?.status,
                "data":error?.data,
            }
            return errorResponse
    }
    
}
export function loader({ request }) {
   return null
}

const inputFormClassNames = {
    label:['text-md text-primary dark:text-darkPrimary font-semibold '],
    input:['text-base'],
    inputWrapper:[
        "outline outline-1 outline-offset-1 outline-tertiary dark:outline-darkTertiary",
        "text-primary dark:text-darkPrimary bg-secondary dark:bg-darkSecondary text-2xl",
        "group-data-[focus-within=true]:outline-2",
        "group-data-[focus-within=true]:bg-secondary",
        "dark:group-data-[focus-within=true]:bg-darkSecondary",
        "group-data-[hover=true]:bg-secondary",
        "dark:group-data-[hover=true]:bg-darkSecondary",
        "group-data-[hover=true]:outline-2",
        "group-data-[focus-within=true]:shadow-button",
        "dark:group-data-[focus-within=true]:shadow-darkButton",
        "dark:group-data-[hover=true]:shadow-darkButton",

    ],
}
export default function Register(){

    const actionError =  useActionData()
    console.log(actionError)
    const data = actionError?.data

    return(
        <div className="relative h-[100vh]">
            <div className="flex flex-col
                            absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
                            min-w-[40%] p-4 px-8">
                <h3 className=' text-center text-2xl mb-2 m-auto font-semibold'> Welcome Wanderer!</h3>
                <Form
                    method='post'>
                    <Input
                        className='my-4'
                        name='username'
                        type='text'
                        label='USERNAME'
                        radius='sm'
                        labelPlacement='outside'
                        placeholder='Enter Username'
                        isRequired
                        classNames={inputFormClassNames}
                        errorMessage={data?.username && data.username }
                    />
                    <Input
                        name='email'
                        type='email'
                        className='my-4'
                        label='EMAIL'
                        labelPlacement='outside'
                        placeholder='Enter Email'
                        radius='sm'
                        isRequired
                        classNames={inputFormClassNames}
                        errorMessage={data?.email && data.email} 
                    />
                    <Input
                        name='password'
                        type='password'
                        className='my-4'
                        label='PASSWORD'
                        labelPlacement='outside'
                        placeholder='Enter Password'
                        radius='sm'
                        isRequired
                        classNames={inputFormClassNames}
                        errorMessage={data?.password && data.password} 
                    />
                    <Input
                        name='confirmPassword'
                        type='password'
                        className='my-4'
                        label='CONFIRM PASSWORD'
                        labelPlacement='outside'
                        placeholder='Enter Passoword Again'
                        radius='sm'
                        isRequired
                        classNames={inputFormClassNames}
                        errorMessage={data?.password && data.password} 
                    />

                    <Button fullWidth
                            type='submit'
                            radius='sm'
                            className=' font-semibold text-lg
                                       shadow-button hover:shadow-button-hover
                                        hover:text-quarternery hover:bg-primary font-serif text-inherit bg-quarternery
                                        dark:shadow-darkButton dark:hover:shadow-darkButton-hover dark:hover:text-darkQuarternery
                                        dark:hover:bg-darkPrimary dark:bg-darkQuarternery'>
                        Register
                    </Button>
                </Form>
                <span className='text-xs text-primary dark:text-darkPrimary my-2'>Already a User ?
                         <a className="text-sm text-blue-400 hover:underline mx-1" 
                            href="/login">
                            Login
                        </a>
                </span>
            </div>
        </div>
    
    )
}