import { Avatar , Card , CardBody } from "@nextui-org/react"
import { useParams } from "react-router-dom"
import { useRef , useEffect } from "react"


function Message(props){
    const isCurrentUser = props.isCurrentUser
    const anotherUserNotchClassNames = `before:absolute before:top-0 before:left-0 before:h-8 before:w-8 
                                         before:bg-transparent  before:-mt-8 before:rounded-bl-2xl 
                                         before:shadow-[0px_16px] before:shadow-quarternery/20
                                         before:content-[''] p-4 
                                         dark:before:shadow-darkQuarternery/20`
    const currentUserNotchClassName = `after:absolute after:h-8 after:w-8 after:content-['']
                                       after:right-0 after:rounded-tr-2xl after:shadow-[0px_-16px]
                                       after:shadow-quarternery/80 after:mt-4 after:bg-transparent p-4
                                       dark:after:shadow-darkQuarternery/80`
    return(
        <div className={`relative w-fit m-4 max-w-[65%] shadow-box dark:shadow-darkBox
                         ${isCurrentUser ?
                           "rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl bg-quarternery/80 dark:bg-darkQuarternery/80 self-end" : 
                          "rounded-bl-2xl rounded-tr-2xl rounded-br-2xl  bg-quarternery/20 dark:bg-darkQuarternery/20 "}`}>
            {/* { !props.isCurrentUser && <Avatar radius="sm" isBordered src={props.avatar}/>} */}
            <div radius="sm" className= {isCurrentUser ? currentUserNotchClassName : anotherUserNotchClassNames}>
                    <p > 
                        {props.message}
                        <sub className="ml-2 text-[10px]">{props.createdAt}</sub>
                    </p>
            </div>
        </div>
    )
}
 
export default function MessageArea(props){

    const current_user_id = localStorage.getItem('user_id')
    const messages = props.messages
    console.log(messages)

    const messageElements = messages.map((message)=>{
        const time = message.created_at
        const dateTime = new Date(time)
        const today = new Date()
        const isToday = today.toDateString() === dateTime.toDateString();
        let day = dateTime.toLocaleString('en-us', {weekday: 'long'});
        const [ hours , minutes] = [ dateTime.getHours() , dateTime.getMinutes() ]
        
        const createdAt = isToday ? `${hours}:${minutes}` : `${day}, ${hours}:${minutes}`;
        return(
            <Message key={message.id}
                     message={message.content}
                     isCurrentUser={message.sender == current_user_id }
                     createdAt={createdAt}
                     />
        )
    })
    const messageContainerRef = useRef(null);

    useEffect(() => {
        const messageContainer = messageContainerRef.current;
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }, [messages]);

    return(
        <div ref={messageContainerRef} className="w-full p-4 shadow-box rounded-2xl flex flex-col overflow-auto flex-grow">
            {messageElements}
        </div>
    )
}