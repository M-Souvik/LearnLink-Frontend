import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "./ui/dropdown-menu"
const Dropdown = ({trigger,content}) => {
  return (
    <DropdownMenu>
  <DropdownMenuTrigger asChild>
    {trigger}
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    {content}
  </DropdownMenuContent>
</DropdownMenu>
  )
}

export default Dropdown