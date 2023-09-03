
import { Outlet } from "react-router-dom";
import { Tab , Tabs ,Chip } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
export default function DashboardLayout(){
    return(
        <div className="flex flex-row ">  
            <div className="flex-[1 1 10%]">
                <Tabs 
                    aria-label="Options" 
                    color="primary" 
                    variant="underlined"
                    className="w-20"
                    classNames={{
                    tabList: " flex flex-col gap-6 w-full relative rounded-none p-0 border-b border-divider",
                    cursor: "w-full bg-[#22d3ee]",
                    tab: "max-w-fit px-0 h-12",
                    tabContent: "group-data-[selected=true]:text-[#06b6d4]"
                    }}
                >
                    <Tab
                    key="photos"
                    title={
                        <Link>
                            <div className="flex items-center space-x-2">
                                <span>Photos</span>
                                <Chip size="sm" variant="faded">9</Chip>
                            </div>
                        </Link>
                      
                    }
                    />
                  
                    <Tab
                    key="music"
                    title={
                        <Link href="/dashboard/messages">
                            <div className="flex items-center space-x-2">
                                <span>Messages</span>
                                <Chip size="sm" variant="faded">3</Chip>
                            </div>
                        </Link>
                    }
                    />
                    
                    <Tab
                    key="videos"
                    title={
                        <Link>  
                            <div className="flex items-center space-x-2">
                                <span>Videos</span>
                                <Chip size="sm" variant="faded">1</Chip>
                            </div>
                        </Link>
                    }
                    />
                </Tabs>  
            </div>
            <Outlet className="flex-[25 1 90%]"/>
        </div>
    )
}