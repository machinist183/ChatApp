import ConversationBanner from "./ConversationBox/ConversationBanner"
import MessageArea from "./ConversationBox/MessageArea"
import InputBox from "./ConversationBox/InputBox" 
import { getConversationDetailData } from "../data/dataApi"
import { useLoaderData } from "react-router-dom"

export function loader({params}){
    const conversationDetailData = getConversationDetailData(2)
    console.log(params)
    return conversationDetailData 
}

export default function ConversationBox(props){

    const conversationDetailData = useLoaderData()
    const userDetails = conversationDetailData.userDetails
    return(
        <div className="min-w-[50%] flex flex-col space justify-between border-2 border-black">
            <ConversationBanner userDetails ={userDetails}/>
            <MessageArea/>
            <InputBox/>
        </div>
    )
}

