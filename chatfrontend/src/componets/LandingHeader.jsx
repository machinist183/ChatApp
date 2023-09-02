import { nextui } from "@nextui-org/react"
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
export default function LandingHeader(){
    return(
        <>
            <Navbar className ="bg-transparent" position="static" isBlurred="false">
                <NavbarBrand>
                    <h1 className="mr-2">Logo</h1>
                    <p className="font-bold text-inherit">ACME</p>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-16" justify="center">
                    <NavbarItem>
                        <Link color="foreground" href="#">
                            Dashboard
                        </Link>
                    </NavbarItem>
                    <NavbarItem >
                        <Link color="foreground" href="#">
                            Contact Us
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="#">
                            About Us
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="#">
                            Safety
                        </Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent className="m-auto" justify="end">
                    <NavbarItem className="hidden lg:flex"> 
                        <Button as={Link} color="primary" href="login" variant="flat">
                            Log In
                        </Button>
                    </NavbarItem>
                    <NavbarItem>
                        <Button as={Link} color="primary" href="register" variant="flat">
                            Sign Up
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
        </>
    )
}