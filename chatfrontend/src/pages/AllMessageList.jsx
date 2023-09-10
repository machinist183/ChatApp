import React from "react";
import { Listbox , ListboxItem , Avatar , ListboxSection } from "@nextui-org/react";
import { getGroupConversationListApi, getPrivateConversationListApi } from "../data/dataApi";
import { Link, useLoaderData } from "react-router-dom";
import { Outlet } from "react-router-dom";


export function loader({params}){
  const userId = params.userId
  const privateConvoDataList = getPrivateConversationListApi(parseInt(userId))
  const groupConversationDataList = getGroupConversationListApi(parseInt(userId))
  return { privateConvoDataList , groupConversationDataList }
}

const UserAvatar = (props) => {
  return(
      <Link to={`see_profile/${props.id}`}>
        <Avatar isBordered radius="sm" src={props.avatar} />
      </Link>
  )
}


const DescriptionLink = (props)=>(<Link to={`conversation/${props.type}/${props.id}`}>{props.content}</Link>)


export default function AllMessageList() {
  const { privateConvoDataList , groupConversationDataList } = useLoaderData()

  return (
    <div className="flex flex-row">
      <Listbox className="w-[30%]">
        <ListboxSection title="Private Chats" showDivider>
          {privateConvoDataList.map((conversation)=>{
            return(
                <ListboxItem
                  key={conversation.conversation_id}
                  description={<DescriptionLink id={conversation.conversation_id}
                                                type='private' 
                                                content={conversation.lastMessage}/>
                              }
                  startContent={<UserAvatar avatar={conversation.avatar}
                                            id={conversation.receiverUserId}/>
                               }
                  variant="shadow"
                >
                   {<DescriptionLink id={conversation.conversation_id} 
                                     type='private' 
                                     content={conversation.username}/>
                    }
                </ListboxItem>

            )
          })}
        </ListboxSection>

        <ListboxSection title="Group Chats" showDivider>
          {groupConversationDataList.map((conversation)=>{
            return(
                <ListboxItem
                  key={conversation.conversation_id}
                  description={<DescriptionLink id={conversation.conversation_id}
                                                type='group' 
                                                content={conversation.lastMessage}/>
                                }
                  startContent={<UserAvatar avatar={conversation.avatar}
                                            id={conversation.groupId}/>
                                }
                  variant="shadow"
                >
                    {<DescriptionLink id={conversation.conversation_id}
                                      type='group'
                                      content={conversation.username}/>
                    }

                </ListboxItem>
            )
          })}
        </ListboxSection>  
      </Listbox>
      <Outlet/>
    </div>
  )
}
