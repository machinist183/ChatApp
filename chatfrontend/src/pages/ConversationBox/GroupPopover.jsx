import { Link , Avatar , Popover ,PopoverTrigger ,
    PopoverContent , Button , Image ,
    Card, CardHeader , Tab , Tabs , Listbox , ListboxItem } from "@nextui-org/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faXmark , faUserPlus , faUserSlash , faGift , faHandPointRight } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

export default function GroupPopover(props){

const groupDetails = props.groupDetails
const [isIconPicExpanded, setIconPicExpanded] = useState(false)
const handleIconPicClick= () => (setIconPicExpanded(!isIconPicExpanded))

const [selectedTab , setSelectedTab] = useState('about')
const coverImageClass = `bg-[url('${groupDetails.group_cover_pic}')]`
return(
   <>
       <Popover showArrow className="">
           <PopoverTrigger className="hover:shadow-box-hover dark:hover:shadow-darkBox-hover min-w-fit">  
               <div  className="min-w-[40%] flex flex-row items-center p-2">
                   <Avatar radius="sm" size="lg" src={groupDetails.group_icon_pic}
                           className="mr-2 outline outline-2 outline-offset-2 outline-primary dark:outline-darkPrimary"
                   />
                   <h3 className="text-large text-primary dark:text-darkPrimary font-bold ml-4">{groupDetails.group_name}</h3>
               </div>  
           </PopoverTrigger>
           <PopoverContent className="w-[40rem] h-[80vh]  flex flex-col justify-start p-0 m-0
                                     bg-secondary dark:bg-darkSecondary shadow-box">
               <div className={`w-full h-[40%] flex flex-col 
                               justify-between  bg-center
                               ${ isIconPicExpanded && 'blur-sm'} rounded-tl-xl rounded-tr-xl
                               bg-cover bg-no-repeat`}
                     style={{backgroundImage:`url('${groupDetails.group_cover_pic}')`}}
               >

                       <Popover placement="bottom-end">
                           <PopoverTrigger className="mr-4 mt-4">
                               <Button isIconOnly 
                                       variant="light"
                                       className="self-end">
                                       {<FontAwesomeIcon icon={faCaretDown} size="2xl" className="text-primary dark:text-darkPrimary"/>}
                               </Button>
                           </PopoverTrigger>
                           <PopoverContent className="bg-secondary text-primary
                                                      dark:bg-darkSecondary dark:text-darkPrimary">
                               <Listbox radius="sm"
                                        variant="faded" aria-label="Listbox menu with icons"
                                        className="w-[100%]">
                                   <ListboxItem
                                   key="friendRequest"
                                   startContent={<FontAwesomeIcon icon={ faUserPlus } />}
                                   className="w-full"
                                   >
                                   Add Friend
                                   </ListboxItem>
                                   <ListboxItem
                                   key="sendGift"
                                   startContent={<FontAwesomeIcon icon={faGift} />}
                                   >
                                   Send Gift
                                   </ListboxItem>
                                   <ListboxItem
                                   key="poke"
                                   showDivider
                                   startContent={<FontAwesomeIcon icon={faHandPointRight}/>}
                                   >
                                   Poke
                                   </ListboxItem>
                                   <ListboxItem
                                   key="block"
                                   className="text-danger dark:text-red-400"
                                   color="danger"
                                   startContent={<FontAwesomeIcon icon={faUserSlash}/>}
                                   >
                                   Block User
                                   </ListboxItem>
                               </Listbox>
                           </PopoverContent>
                       </Popover>
                 

                   <div className="flex flex-row">
                       <Image
                               isBordered
                               radius="sm"
                               src={groupDetails.group_icon_pic}
                               className={`h-[8rem] w-[8rem] m-4 ${ isIconPicExpanded &&'bg-blur-sm'}`}
                               onClick={handleIconPicClick}
                       />
                       <div className="flex flex-col justify-center ">
                           <h3 className=" text-xl font-bold text-primary dark:text-darkPrimary">{groupDetails.group_name}</h3>
                           <h6 className=" text-base  text-primary dark:text-darkPrimary">{groupDetails.vibe}</h6>
                       </div>
                   </div>
                

               </div>
               <div  className={`${isIconPicExpanded && "blur-sm"} w-full`}>
                   <Tabs fullWidth
                       size="md"
                       aria-label="User Description"
                       selectedKey={selectedTab}
                       onSelectionChange={setSelectedTab}
                       classNames={{
                           base:'',
                           tabList:"h-16 rounded-none bg-secondary dark:bg-darkSecondary shadow-box dark:shadow-darkBox",
                           tab:'h-full text-lg rounded-none bg-secondary dark:bg-darkSecondary',
                           cursor:"group-data-[selected=true]:bg-quarternery group-data-[selected=true]:text-tertiary\
                                   dark:group-data-[selected=true]:bg-darkQuarternery dark:group-data-[selected=true]:text-darkTertiary"
                       }}
                       >
                       <Tab key='info' title='Info'>
                           <p className="m-4 text-primary dark:text-darkPrimary">{groupDetails.info}</p>
                       </Tab>
                       <Tab key='' title="Members">
                           <p className="m-4 text-base" >Members</p>
                       </Tab>
                   </Tabs>
               </div>
             
               {isIconPicExpanded && (
                   <Card className="fixed -translate-x-1/2 -translate-y-1/2 top-1/2 border-2
                                   left-1/2 h-[20em] w-[20em]">
                       <CardHeader className="absolute z-10 !items-start">
                           <Button isIconOnly
                                   radius="lg"
                                   variant="light"
                                   onPress={handleIconPicClick} 
                                   className="left-full -translate-x-8">
                               {<FontAwesomeIcon icon={faXmark}  size="xl"/>}
                           </Button>
                       </CardHeader>
                       <Image
                           removeWrapper
                           src={groupDetails.group_icon_pic}
                           className="h-full w-full object-cover z-0"
                       />
                   </Card>
               )}
           </PopoverContent>
   </Popover>
 
   </>
  
)
} 
