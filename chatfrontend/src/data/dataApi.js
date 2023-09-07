import {privateMessageData} from "./privateMessageData.js";
import {groupData} from "./groupData.js";
import {conversationData} from "./conversationData.js"
import {userData} from "./userData.js"
import { groupMessageData } from "./groupMessageData.js";
import { faL } from "@fortawesome/free-solid-svg-icons";

export function getUserDetails(id){
    const user = userData.filter((user)=>(user.id === id))
    if(!user){
        throw new Error('No user with this id found')
    }
    return user
}

export function getGroupDetails(id){
    const group = groupData.filter((group)=>(group.id === id ))
    if(!group){
        throw new Error('No group with this id found')
   }
}

function getuserPrivateConvesationsList(userId){
    const conversationList = conversationData.filter((conversation)=>{
        return ((conversation.conversation_type === "private") &&
                (conversation.receiver === userId || conversation.sender == userId))
    })

    console.log(conversationList)
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
    console.log(conversationList)
}

export function getProfileData(userId){
    return userData.find((user)=>user.id === userId)
}

export function getGroupData(group_id){
    return groupData.find((group)=>group.id === group_id)
}