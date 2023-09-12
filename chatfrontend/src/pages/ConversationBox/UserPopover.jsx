import { Link , Avatar , Popover ,PopoverTrigger ,
         PopoverContent , Button , Image ,
         Card, CardHeader } from "@nextui-org/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faXmark} from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

export default function UserPopover(props){

    const userDetails = props.userDetails
    console.log('i am rendered')
    console.log(userDetails.avatar)

    const [profilePicExpanded, setProfilePicExpanded] = useState(false);
    const [coverPicExpanded , setCoverPicExpanded] = useState(false)
    const handleProfilePicClick = () => (setProfilePicExpanded(!profilePicExpanded))
    const handleCoverPicClick = ()=>(setCoverPicExpanded(!coverPicExpanded))
    const userProfilePicLink = userDetails?.avatar

    return(
        <>
            <Popover showArrow
                className=" back">
            <PopoverTrigger>  
                <div  className="min-w-[40%] flex flex-row items-center p-2">
                    <Avatar isBordered radius="sm" src={userProfilePicLink}
                            className="mr-2"
                    />
                    <h3 className="font-normal ">{userDetails.username}</h3>
                </div>  
            </PopoverTrigger>
            <PopoverContent className="w-[40rem] h-[80vh]  flex flex-col justify-start p-0 m-0">
                <div className={`w-full h-[40%] border-4
                                flex flex-col justify-between bg-[url('${userDetails.cover_pic}')]
                                ${(profilePicExpanded || coverPicExpanded) && 'blur-sm'}
                                bg-center bg-cover bg-no-repeat`}>

                    <Button isIconOnly className="border-2 border-pink-300 self-end">
                        {<FontAwesomeIcon icon={faCaretDown} size="2xl" />}
                    </Button>
                    <Image
                            isBordered
                            radius="sm"
                            src={userDetails.avatar}
                            className={`h-[8rem] w-[8rem] ${ profilePicExpanded &&'bg-blur-sm'}`}
                            onClick={handleProfilePicClick}
                    />
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
                {/* {profilePicExpanded && (
                    <div >
                        <Button isIconOnly
                                onPress={handleProfilePicClick} 
                                className="relative top-4 left-full -translate-y-8">
                            {<FontAwesomeIcon icon={faCross} size="xl"/>}
                        </Button>
                    </div>)} */}
            </PopoverContent>
        </Popover>
      
        </>
       
    )
} 

