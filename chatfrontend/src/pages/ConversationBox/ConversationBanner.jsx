import React from "react";
import {Navbar, NavbarBrand,} from "@nextui-org/react";

import UserPopover from "./UserPopover";
export default function ConversationBanner(props) {
    const userDetails = props.userDetails
  return (
    <Navbar isBordered className="h-20 m-1 p-1 bg-secondary  rounded-lg shadow-box
                                  dark:bg-darkSecondary dark:shadow-darkBox" >
      <NavbarBrand  className="" >
        <UserPopover userDetails={userDetails}/>
      </NavbarBrand>
    </Navbar>
  );
}