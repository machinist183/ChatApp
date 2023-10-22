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

        return redirect(`/dashboard/${user_id}/explore`)

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
export default function Login(){

    const loaderData = useLoaderData()
    const actionError = useActionData()
    const actionErrorDetail = actionError?.data?.detail
    return(
        <div className="relative h-[100vh]">
            <div className="flex flex-col
                            absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
                            min-w-[40%] p-4 px-8">
                <h3 className='text-center text-2xl mb-2 m-auto font-semibold'> Welcome Back !</h3>
                <p className='text-center m-auto text-tertiary dark:text-darkTertiary' >We're so excited to see you again!</p>
                {actionErrorDetail && <p className='m-auto mt-2 text-center text-red-700 dark:text-red-400 text-base font-bold'>{actionErrorDetail}</p>}
                {loaderData?.message && <p className='m-auto mt-2 text-center text-red-700 dark:text-red-400  text-base font-bold'>{loaderData?.message}</p>}
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
                            className=' font-semibold text-lg
                                        shadow-button hover:shadow-button-hover
                                      hover:text-quarternery hover:bg-primary font-serif text-inherit bg-quarternery
                                      dark:shadow-darkButton dark:hover:shadow-darkButton-hover dark:hover:text-darkQuarternery
                                      dark:hover:bg-darkPrimary dark:bg-darkQuarternery' >
                        Log In
                    </Button>
                </Form>
                <span className='text-xs text-primary dark:text-darkPrimary my-2'>Need an account ?
                         <a className="text-sm text-blue-400 hover:underline mx-1" 
                            href="/register">
                            Register
                        </a>
                </span>
            </div>
        </div>
    
    )
}