import React from "react";
import {Avatar , Navbar, NavbarBrand, NavbarContent, NavbarItem, Button} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo , faPhone , faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import UserPopover from "./UserPopover";

export default function ConversationBanner(props) {

    const userDetails = props.userDetails
    const navitemClasses = "mx-2 text-xl"

  return (
    <Navbar isBordered className="h-20" >
      <NavbarBrand  className="" >
        <UserPopover userDetails={userDetails}/>
      </NavbarBrand>
      <NavbarContent className="flex flex-row mx-auto border-2 border-black px-4" justify="centre"
                  > 
        <NavbarItem>
          <Link  to="#" className={navitemClasses}>
          <FontAwesomeIcon icon={faVideo} />
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link  to="#" className={navitemClasses}>
          <FontAwesomeIcon icon={faPhone} />
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link  to="#" className={navitemClasses}>
          <FontAwesomeIcon icon={faEllipsisVertical} />
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}