import { Avatar , Card , CardBody } from "@nextui-org/react"
import { useParams } from "react-router-dom"
import { useRef , useEffect } from "react"


function Message(props){
    const isCurrentUser = props.isCurrentUser
    return(
        <>
          <div className={`ml-1 mt-1 max-w-[65%] ${isCurrentUser ? "self-end":"flex flex-row"}`}>
            {!isCurrentUser &&
            <div className="mr-1">
                <Avatar className="" size="sm" radius="xl" src={props?.senderProfilePic}/>
            </div>
            }
            <div className={`pb-1 m-1 px-2 overscroll-none
                        ${isCurrentUser ?
                        "rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl bg-quarternery/80 dark:bg-darkQuarternery/80 ml-auto self-end p-2" : 
                        " flex flex-col justify-start rounded-bl-2xl rounded-tr-2xl rounded-br-2xl bg-quarternery/20 \
                          dark:bg-darkQuarternery/20"}`}>
                {!isCurrentUser && <small className="m-1">{props.senderUsername}</small>}
                <p className={`m-1 ${isCurrentUser ? "text-left":""}`}>
                    {props.message}
                    <sub className="ml-2 text-[10px]">{props.createdAt}</sub>
                </p>
            </div>
         
          </div>
        </>
      
    )
}
 
export default function GroupMessageArea(props){

    const current_user_id = localStorage.getItem('user_id')
    const messages = props.messages

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
                     senderProfilePic={message?.profile_pic}
                     senderUsername={message?.sender_username}
                     createdAt = {createdAt}
                    />
        )
    })
    const messageContainerRef = useRef(null);

    useEffect(() => {
        const messageContainer = messageContainerRef.current;
        messageContainer.scrollTop = messageContainer.scrollHeight
    }, [messages]);

    return(
        <div ref={messageContainerRef} className="w-full p-4 shadow-box darl:shadow-darkBox
                                                  rounded-2xl flex flex-col overflow-auto flex-grow">
            {messageElements}
        </div>
    )
}