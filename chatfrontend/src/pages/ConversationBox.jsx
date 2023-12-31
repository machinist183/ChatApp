import ConversationBanner from "./ConversationBox/ConversationBanner"
import MessageArea from "./ConversationBox/MessageArea"
import InputBox from "./ConversationBox/InputBox" 

import { useLoaderData, useLocation, useParams } from "react-router-dom"
import axiosWithJwtInterceptor, { redirectToLogin } from "../helpers/jwtInterceptor"
import { API_BASE_URL , WEBCHAT_ROOT } from "../config"

import { useState , useEffect} from "react"
import useWebSocket, { ReadyState } from 'react-use-websocket';


export async function loader({params}){
    try {
        const user_id = params["user_id"]
        const jwtAxios = axiosWithJwtInterceptor()
        const userDataResponse = await jwtAxios.get(
            `${API_BASE_URL}/profile/${user_id}`,
            {
                withCredentials:true,
            }
        )

        const messagesResponse = await jwtAxios.get(
            `${API_BASE_URL}/privatemessages/${user_id}`,
            {
                withCredentials:true,
            }
        )
        const messages = messagesResponse.data
        const userDetails = userDataResponse.data
        return  { userDetails , messages }

    } catch (error) {
        redirectToLogin(error)
        console.log(error)
        console.log('i am outside error')
        return error
    }
}

export default function ConversationBox(props){

    const {userDetails , messages } = useLoaderData()
    const [messagesArray , setMessagesArray] = useState(messages)
    const [reconnectionAttempt , setReconnectionAttempt] = useState(0) 

    const socketUrl = `${WEBCHAT_ROOT}/privatechat/${userDetails.username}`
    const maxConnectionAttempts = 4

    useEffect(() => {
        setMessagesArray(messages); 
    }, [messages])

    const { sendJsonMessage } = useWebSocket(socketUrl, {
        withCredentials:true,
        onOpen: async () => {
          try {
            console.log("Opened");
          } catch (error) {
            console.log("onopen error");
          }
        },
        onClose: (event) => {
          setReconnectionAttempt((prevAttempt) => prevAttempt + 1);
          console.log("closed")
        },
        onError: () => {
          console.log("Error!");
        },
        onMessage: (msg) => {
          const msgObj = JSON.parse(msg.data)
          if (msgObj.type == 'error'){
            return
          }
          setMessagesArray((prev_msg) => [...prev_msg, msgObj.message ]);
        },
        shouldReconnect: (closeEvent) => {
          if (
            reconnectionAttempt > maxConnectionAttempts
          ) {
            setReconnectionAttempt(0);
            return false;
          }
          return true;
        },
        reconnectInterval: 1000,
      });

    return(
        <div className="flex flex-col justify-between w-full shadow-box dark:shadow-darkBox">
            <ConversationBanner userDetails ={userDetails}/>
            <MessageArea messages={messagesArray} userDetails ={userDetails}/>
            <InputBox onSend = {sendJsonMessage} />
        </div>
    )
}

