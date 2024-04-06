import React from "react";
import { Link, Button } from "@nextui-org/react";

export default function ClassicButton() {
  return (
    <Button
      className=" border-gray-500 bg-white text-black px-4 py-2 rounded-full"
      href="https://github.com/nextui-org/nextui"
      showAnchorIcon
      variant="solid"
    >
      Add course
    </Button>
  );
}
