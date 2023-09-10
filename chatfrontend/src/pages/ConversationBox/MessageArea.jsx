import { Avatar , Card , CardBody } from "@nextui-org/react"
import { useParams } from "react-router-dom"

function Message(props){
    const isCurrentUser = props.isCurrentUser
    const anotherUserNotchClassNames = `before:absolute before:top-0 before:left-0 before:h-8 before:w-8 
                                         before:bg-transparent  before:-mt-8 before:rounded-bl-2xl 
                                         before:shadow-[0px_16px] before:shadow-neutral-300
                                         before:content-[''] p-4 `
    const currentUserNotchClassName =  `before:absolute before:top-0 before:right-0  before:h-8 before:w-8 
                                        before:bg-transparent  before:-mt-8 before:rounded-br-2xl 
                                        before:shadow-[0px_16px] before:shadow-neutral-400
                                        before:content-[''] p-4 `
    return(
        <div className={`relative text-start m-4 max-w-[65%] 
                         ${isCurrentUser ?
                           "rounded-tl-2xl rounded-bl-2xl rounded-br-2xl  bg-neutral-400 self-end" : 
                          "rounded-bl-2xl rounded-tr-2xl rounded-br-2xl bg-neutral-300 "}`}>
            {/* { !props.isCurrentUser && <Avatar radius="sm" isBordered src={props.avatar}/>} */}
            <div radius="sm" className= {isCurrentUser ? currentUserNotchClassName : anotherUserNotchClassNames}>
                    <p >{props.message}</p>
            </div>
        </div>
    )
}
 
export default function MessageArea(props){
    const params = useParams()
    console.log(`params ${JSON.stringify(params)}`)
    const currentUserId = parseInt(params.userId)
    const messages = props.messages
    const userDetails = props.userDetails
    const messageElements = messages.map((message)=>{
        return(
            <Message message={message.content} avatar={userDetails.avatar} isCurrentUser={currentUserId === message.senderId} />
        )
    })
    return(
        <div className="flex flex-col border-4 border-red-800   overflow-scroll">
            {messageElements}
        </div>
    )
}