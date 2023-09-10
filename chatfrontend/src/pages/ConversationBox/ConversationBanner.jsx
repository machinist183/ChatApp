import React from "react";
import {Avatar , Navbar, NavbarBrand, NavbarContent, NavbarItem, Button} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo , faPhone , faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

export default function ConversationBanner(props) {

    const userDetails = props.userDetails
    const navitemClasses = "mx-2 text-xl"

  return (
    <Navbar isBordered className="h-20" >
      <NavbarBrand  className="">
        <Link to="#" className="min-w-[40%] flex flex-row items-center border-2 border-black p-2">
            <Avatar isBordered radius="sm" src={userDetails.avatar}
                    className="mr-2"
            />
            <h3 className="font-normal">{userDetails.username}</h3>
        </Link>
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