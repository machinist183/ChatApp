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
    label:['text-neutral-200 text-sm font-semibold '],
    inputWrapper:[
        "bg-neutral-950",
        "text-neutral-200",
        "hover:border-1 border-neutral-200",
        "focus-within:border-1 border-neutral-200",
        "group-data-[focus-within=true]:bg-neutral-950",
        "group-data-[hover=true]:bg-neutral-950",
    ],
}
export default function Register(){

    const actionError =  useActionData()
    console.log(actionError)
    const data = actionError?.data

    return(
        <div className="relative h-[100vh] bg-gradient-to-t from-[#948E99] to-[#2E1437]">
            <div className="flex flex-col text-neutral-200
                            absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
                            min-w-[40%] p-4 px-8 
                            bg-neutral-800">
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
                            className='bg-violet-800 hover:bg-violet-950 text-neutral-200 font-bold text-[1rem]'>
                        Register
                    </Button>
                </Form>
                <span className='text-xs text-neutral-500 my-2'>Already a User ?
                         <a className="text-sm text-blue-500 hover:underline mx-1" 
                            href="/login">
                            Login
                        </a>
                </span>
            </div>
        </div>
    
    )
}