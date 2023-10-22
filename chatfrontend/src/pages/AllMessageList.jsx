import React from "react";
import { Listbox , ListboxItem , Avatar , ListboxSection , Divider } from "@nextui-org/react";
import { Link, useLoaderData ,NavLink} from "react-router-dom";
import { Outlet } from "react-router-dom";
import axiosWithJwtInterceptor , {redirectToLogin} from "../helpers/jwtInterceptor";
import { API_BASE_URL } from "../config";


export async function loader(){
  const jwtAxios = axiosWithJwtInterceptor()
  try{
      const privateConvoDataListResponse = await jwtAxios.get(
        `${API_BASE_URL}/privateconversations`,
        {
        withCredentials:true
        }
      )
      const groupConvoDataListResponse = await jwtAxios.get(
        `${API_BASE_URL}/groupconversations`,
        {
          withCredentials:true
        }
      )
      const privateConversations = privateConvoDataListResponse.data
      const groupConversations  = groupConvoDataListResponse.data
      return { privateConversations , groupConversations }
    }catch(error){
      console.log(error)
      redirectToLogin(error)
      return error
  }
}



export default function AllMessageList() {

  const { privateConversations , groupConversations} = useLoaderData()
  
  const classNameFunction = ({ isActive }) =>
                                  [
                                  isActive ? "bg-primary dark:bg-darkPrimary text-secondary dark:text-darkSecondary" : "",
                                  " mx-1 mt-1  my-auto rounded-md \
                                   hover:outline hover:outline-1 hover:outline-primary dark:hover:outline-darkPrimary "
                                  ].join(" ")

  return (
    <div className="flex flex-row w-[100%] ">
            <div className="mr-1 p-1 flex flex-col min-w-[25%] shadow-box dark:shadow-darkBox">
              <div className="h-12 p-2 text-center w-full rounded-md shadow-box dark:shadow-darkBox">
                <h6 className="font-bold">Private Chats</h6>
              </div>
    
              <ul className="flex flex-col overflow-scroll w-full pb-2 max-h-[40%]">
                {privateConversations.map((conversation, index)=>{
                    let messageContent = conversation?.latest_message_content
                    messageContent = messageContent.length >= 30 ? `${messageContent.slice(0,30)} ...`:`${messageContent}`
                    return(
                        <NavLink to={`privatechat/${conversation?.user_id}`}
                                  className={classNameFunction}>
                            <div className="flex flex-row h-full items-center">
                              <Avatar radius="sm" className="m-1 w-[15%] shrink-0" size="lg" src={conversation?.profile_pic}/>
                              <div className="ml-2 flex flex-col justify-start self-start">
                                  <p className="text-large font-semibold my-auto">{conversation?.username}</p>
                                  <p className="text-base ">{messageContent}</p>
                              </div>
                            </div>
                        </NavLink>
                    )   
                })}
              </ul>
   
              <div className="h-12 p-2 mt-2 text-center w-full rounded-md shadow-box dark:shadow-darkBox">
                <h6 className="font-bold">Group Chats</h6>
              </div>
         
              <ul className="flex flex-col overflow-scroll pb-2">
                {groupConversations.map((conversation, index)=>{
                    let messageContent = conversation?.latest_message_content
                    messageContent = messageContent.length >= 30 ? `${messageContent.slice(0,30)}...`:`${messageContent}`

                    return(
                      <NavLink to={`groupchat/${conversation.group}`}
                               className={classNameFunction}>
                          <div className="flex flex-row h-full items-center">
                              <Avatar radius="sm" size="lg" className="m-1 w-[15%] shrink-0" src={conversation?.icon_pic}/>
                              <div className="ml-2 flex flex-col justify-start self-start">
                                  <p className="text-large font-semibold my-auto">{conversation?.group}</p>
                                  <p className="text-base ">{messageContent}</p>
                              </div>
                          </div>
                      </NavLink>
                    )
                })}
              </ul>
            </div>
            <Outlet  className="w-[100%]"/>
    </div>
  )
}
