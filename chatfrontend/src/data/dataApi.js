import {privateMessageData} from "./privateMessageData.js";
import {groupData} from "./groupData.js";
import {conversationData} from "./conversationData.js"
import {userData} from "./userData.js"
import { groupMessageData } from "./groupMessageData.js";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { user } from "@nextui-org/react";

export function getUserDetails(id){
    const user = userData.find((user)=>(user.id === id))
    if(!user){
        throw new Error('No user with this id found')
    }
    return user
}

export function getGroupDetails(id){
    const group = groupData.find((group)=>(group.id === id ))
    if(!group){
        throw new Error('No group with this id found')
   }
}

export function getuserPrivateConvesationsList(userId){
    const conversationList = conversationData.filter((conversation)=>{
        return ((conversation.conversation_type === "private") &&
                (conversation.receiver === userId || conversation.sender == userId))
    })

    return conversationList
}

export function getGroupUserConversations(userId){
    const conversationList = conversationData.filter((conversation)=>{
        if(conversation.conversation_type === "group"){
            const group_id  = conversation.group_id
            const groupMembers = groupData.find(group => group.id === group_id).members
            
            if (groupMembers.includes(userId)){
                return true
            }
        }
        else{
            false
        }
    })
    return conversationList
}
export function getLastMessageInConversation(id){
    const privateConv = conversationData.find((conversation)=> conversation.id === id)
    const messagesList = privateConv.messages.map((messageId)=>(privateMessageData.find((message)=>message.id===messageId)))
    const sortedMessageList = messagesList.sort( (a , b) => a.created_at - b.created_at)
    return sortedMessageList[0]
}

export function getPrivateConversationListApi(id){

    const privateConvoList = getuserPrivateConvesationsList(id)
    const privateConvoListforApi = privateConvoList.map((privateconversation)=>{
        const receiverId = privateconversation.receiver
        const receiverData = getUserDetails(receiverId)

        return(
            {
                'conversation_id': privateconversation.id,
                'username':receiverData.username,
                'avatar': receiverData.avatar,
                'receiverUserId':receiverData.id,
                'lastMessage': getLastMessageInConversation(privateconversation.id).content

            }
        )
    })
    return privateConvoListforApi
}



export function getGroupConversationListApi(id){
    const groupConversationList = getGroupUserConversations(id)
    const groupConversationListApi = groupConversationList.map((conversation)=>{

        const relatedGroup = groupData.find((group)=> group.id === conversation.group_id)

        return {
            'conversation_id':conversation.id,
            'username': relatedGroup.username ,
            'avatar':relatedGroup.avatar,
            'lastMessage':getLastMessageInConversation(conversation.id).content,
            'groupId':relatedGroup.id
        }
    })
    return groupConversationListApi
}

export function getConversationDetailData(id, type) {
    try {
        console.log(`conversatio Id= ${id}`)
        id = parseInt(id)
        const conversationForId = conversationData.find((conversation) => (conversation.id === id));
        console.log(`Conversation DATA = ${JSON.stringify(conversationForId)}`)

        if (!conversationForId) {
            throw new Error(`Conversation with id ${id} not found.`);
        }

        const conversationType = conversationForId.conversation_type;
        const conversationMessageIdList = conversationForId.messages;
        const conversationMessages = conversationMessageIdList.map((id) => {
            const message = conversationForId.conversation_type === 'private' ?
                privateMessageData.find((message) => message.id === id) :
                groupMessageData.find((message) => message.id === id);

            return message;
        });

        // Parse created_at strings to Date objects
        const parsedMessages = conversationMessages.map(message => ({
            ...message,
            created_at: new Date(message.created_at)
        }));

        const sortedMessageList = parsedMessages.sort((a, b) => a.created_at - b.created_at);
        let banner_heading = conversationType === 'group' ? 'groupDetails' : 'userDetails';
        const banner_data = conversationType === 'group' ?
            groupData.find((group) => group.id === conversationForId.group_id) :
            userData.find((user) => user.id === conversationForId.receiver);

        return {
            [banner_heading]: banner_data,
            messages: sortedMessageList
        }
    } catch (err) {
        console.log(err);
        // Handle the error or return an appropriate value
    }
}

console.log(getConversationDetailData(50 , 'private'))