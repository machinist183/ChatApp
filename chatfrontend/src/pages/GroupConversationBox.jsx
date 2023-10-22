import GroupConversationBanner from "./ConversationBox/GroupConversationBanner"
import GroupMessageArea from "./ConversationBox/GroupMessageArea"
import InputBox from "./ConversationBox/InputBox" 
import { useLoaderData} from "react-router-dom"
import axiosWithJwtInterceptor, { redirectToLogin } from "../helpers/jwtInterceptor"
import { API_BASE_URL , WEBCHAT_ROOT } from "../config"
import { useState , useEffect} from "react"
import useWebSocket  from 'react-use-websocket';
import { faUnderline } from "@fortawesome/free-solid-svg-icons"


export async function loader({params}){
    try {
        const groupName = params["groupName"]
        const jwtAxios = axiosWithJwtInterceptor()
        const groupDataResponse = await jwtAxios.get(
            `${API_BASE_URL}/groups/${groupName}`,
            {
                withCredentials:true,
            }
        )

        const messagesResponse = await jwtAxios.get(
            `${API_BASE_URL}/${groupName}/messages`,
            {
                withCredentials:true,
            }
        )
        const messages = messagesResponse.data
        const groupDetails = groupDataResponse.data
        return  { groupDetails , messages }

    } catch (error) {
        redirectToLogin(error)
        return error
    }
}

export default function GroupConversationBox(props){

    const {groupDetails , messages } = useLoaderData()
    const [messagesArray , setMessagesArray] = useState(messages)
    const [reconnectionAttempt , setReconnectionAttempt] = useState(0) 
    const socketUrl = `${WEBCHAT_ROOT}/groupchat/${groupDetails.group_name}`
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
          console.log(msgObj)
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
            <GroupConversationBanner groupDetails ={groupDetails}/>
            <GroupMessageArea  messages={messagesArray} groupDetails ={groupDetails}/>
            <InputBox onSend = {sendJsonMessage} />
        </div>
    )
}
