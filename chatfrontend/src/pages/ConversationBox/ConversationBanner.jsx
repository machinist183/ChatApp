import React from "react";
import {Avatar , Navbar, NavbarBrand, NavbarContent, NavbarItem, Button} from "@nextui-org/react";
import { Link } from "react-router-dom";

import { faVideo } from "@fortawesome/free-solid-svg-icons";

export default function ConversationBanner(props) {

    const userDetails = props.userDetails


  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Link to="#" className="flex flex-row border-2 border-black p-auto">
            <Avatar isBordered radius="sm" src={userDetails.avatar}/>
            <h3>{userDetails.username}</h3>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center"> 
        <NavbarItem>
          <Link  to="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link to="#">Login</Link>
        </NavbarItem>
        {/* <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem> */}
      </NavbarContent>
    </Navbar>
  );
}