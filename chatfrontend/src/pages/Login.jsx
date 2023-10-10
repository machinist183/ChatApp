import {Form, redirect, useActionData, useLoaderData, useParams} from 'react-router-dom'
import {Input , Button, user } from "@nextui-org/react"
import { login } from '../services/authService'

export function loader({ request }) {
    const url  = new URL(request.url)
    const message = url.searchParams.get("message")
    const messageType = url.searchParams.get("messageType")
    return {
        "message":message,
        "messageType":messageType,
    }
}

export async function action({request}){
   
    try{
        const formData  = await request.formData()
        const username = formData.get("username")
        const password = formData.get("password")
        const response = await login(username , password)
        const user_id = localStorage.getItem("user_id")

        return redirect(`/dashboard/${user_id}/profile`)

    }catch(error){
        const response = error.response
        const errorObj = {
            "status":response?.status,
            "statusText":response?.statusText,
            "data":response?.data
        }
        return errorObj
    }
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
export default function Login(){

    const loaderData = useLoaderData()
    const actionError = useActionData()
    const actionErrorDetail = actionError?.data?.detail
    return(
        <div className="relative h-[100vh] bg-gradient-to-t from-[#948E99] to-[#2E1437]">
            <div className="flex flex-col text-neutral-200
                            absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
                            min-w-[40%] p-4 px-8 
                            bg-neutral-800">
                <h3 className='text-center text-2xl mb-2 m-auto font-semibold'> Welcome Back !</h3>
                <p className='text-center m-auto text-neutral-300' >We're so excited to see you again!</p>
                {actionErrorDetail && <p className='m-auto mt-2 text-center text-red-700 text-base font-bold'>{actionErrorDetail}</p>}
                {loaderData?.message && <p className='m-auto mt-2 text-center text-red-700 text-base font-bold'>{loaderData?.message}</p>}
                <Form
                    method='post'
                    replace
                >
                    <Input
                        className='my-4'
                        name='username'
                        type='text'
                        label='USERNAME'
                        radius='sm'
                        labelPlacement='outside'
                        placeholder='Username'
                        isRequired
                        classNames={inputFormClassNames}
                    />
                    <Input
                        name='password'
                        type='password'
                        className='my-4'
                        label='PASSWORD'
                        labelPlacement='outside'
                        placeholder='Password'
                        radius='sm'
                        isRequired
                        classNames={inputFormClassNames}
                    />

                    <Button fullWidth
                            type='submit'
                            radius='sm'
                            className='bg-violet-800 hover:bg-violet-950 text-neutral-200 font-bold text-[1rem]'>
                        Log In
                    </Button>
                </Form>
                <span className='text-xs text-neutral-500 my-2'>Need an account ?
                         <a className="text-sm text-blue-500 hover:underline mx-1" 
                            href="/register">
                            Register
                        </a>
                </span>
            </div>
        </div>
    
    )
}