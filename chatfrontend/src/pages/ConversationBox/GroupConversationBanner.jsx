import React from "react";
import { Navbar, NavbarBrand,} from "@nextui-org/react";
import GroupPopover from "./GroupPopover";
export default function GroupConversationBanner(props) {
  const groupDetails = props.groupDetails
  return (
    <Navbar isBordered className="m-1 p-1 h-20 shadow-box bg-secondary rounded-lg
                                  dark:bg-darkSecondary dark:shadow-darkBox" >
      <NavbarBrand  className="" >
        <GroupPopover groupDetails={groupDetails}/>
      </NavbarBrand>
      
    </Navbar>
  );
}