import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";

export default function App() {
  return (
    <Navbar isBordered isBlurred={false}>
      <NavbarBrand>
        <Link href="/">
          <p className="font-bold text-inherit">IdeaMagix</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link className="text-[#3a72ff]" href="/">
            Admin
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/instructor" aria-current="page">
            Instructor
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
