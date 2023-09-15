import { Link , Avatar , Popover ,PopoverTrigger ,
         PopoverContent , Button , Image ,
         Card, CardHeader , Tab , Tabs , Listbox , ListboxItem } from "@nextui-org/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faXmark , faUserPlus , faUserSlash , faGift , faHandPointRight } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

export default function UserPopover(props){

    const userDetails = props.userDetails
    const [profilePicExpanded, setProfilePicExpanded] = useState(false)
    const handleProfilePicClick = () => (setProfilePicExpanded(!profilePicExpanded))

    const [selectedTab , setSelectedTab] = useState('about')
    const coverImageClass = `bg-[url('${userDetails.cover_pic}')]`
    return(
        <>
            <Popover showArrow>
                <PopoverTrigger>  
                    <div  className="min-w-[40%] flex flex-row items-center p-2">
                        <Avatar isBordered radius="sm" src={userDetails.avatar}
                                className="mr-2"
                        />
                        <h3 className="font-normal ">{userDetails.username}</h3>
                    </div>  
                </PopoverTrigger>
                <PopoverContent className="w-[40rem] h-[80vh]  flex flex-col justify-start p-0 m-0">
                    <div className={`w-full h-[40%] flex flex-col 
                                    justify-between  bg-center
                                    ${ profilePicExpanded && 'blur-sm'} rounded-tl-xl rounded-tr-xl
                                    bg-cover bg-no-repeat`}
                          style={{backgroundImage:`url('${userDetails.cover_pic}')`}}
                    >

                            <Popover placement="bottom-end">
                                <PopoverTrigger>
                                    <Button isIconOnly 
                                            variant="light"
                                            className="self-end">
                                            {<FontAwesomeIcon icon={faCaretDown} size="2xl" />}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="">
                                    <Listbox radius="sm"
                                             variant="faded" aria-label="Listbox menu with icons"
                                             className="w-[100%]">
                                        <ListboxItem
                                        key="friendReuest"
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
                                        className="text-danger"
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
                                    src={userDetails.avatar}
                                    className={`h-[8rem] w-[8rem] m-4 ${ profilePicExpanded &&'bg-blur-sm'}`}
                                    onClick={handleProfilePicClick}
                            />
                            <div className="flex flex-col justify-center text-black font-extrabold">
                                <h3 className=" text-2xl">{userDetails.username}</h3>
                                <h6 className=" text-md font-normal text-neutral-800">{userDetails.mood}</h6>
                            </div>
                        </div>
                     

                    </div>
                    <div  className={`${profilePicExpanded && "blur-sm"} w-full`}>
                        <Tabs fullWidth
                            size="md"
                            aria-label="User Description"
                            selectedKey={selectedTab}
                            onSelectionChange={setSelectedTab}
                            classNames={{
                                base:'',
                                tabList:"h-16 rounded-none",
                                tab:'h-full text-lg rounded-none'
                            }}
                            >
                            <Tab key='about' title='About Me'>
                                <p className="m-4 text-base">{userDetails.description}</p>
                            </Tab>
                            <Tab key='friends' title="Friends">
                                
                            </Tab>
                        </Tabs>
                    </div>
                  
                    {profilePicExpanded && (
                        <Card className="fixed -translate-x-1/2 -translate-y-1/2 top-1/2 border-2
                                        left-1/2 h-[20em] w-[20em]">
                            <CardHeader className="absolute z-10 !items-start">
                                <Button isIconOnly
                                        radius="lg"
                                        variant="light"
                                        onPress={handleProfilePicClick} 
                                        className="left-full -translate-x-8">
                                    {<FontAwesomeIcon icon={faXmark}  size="xl"/>}
                                </Button>
                            </CardHeader>
                            <Image
                                removeWrapper
                                src={userDetails.avatar}
                                className="h-full w-full object-cover z-0"
                            />
                        </Card>
                    )}
                </PopoverContent>
        </Popover>
      
        </>
       
    )
} 

