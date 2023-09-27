import ConversationBanner from "./ConversationBox/ConversationBanner"
import MessageArea from "./ConversationBox/MessageArea"
import InputBox from "./ConversationBox/InputBox" 
import { getConversationDetailData } from "../data/dataApi"
import { useLoaderData } from "react-router-dom"

export function loader({params}){
    const conversationDetailData = getConversationDetailData(params.id)
    return conversationDetailData 
}

export default function ConversationBox(props){

    const conversationDetailData = useLoaderData()
    const userDetails = conversationDetailData.userDetails
    const messages = conversationDetailData.messages
    return(
        <div className="min-w-[50%] flex flex-col space justify-between">
            <ConversationBanner userDetails ={userDetails}/>
            <MessageArea messages={messages} userDetails ={userDetails}/>
            <InputBox/>
        </div>
    )
}

