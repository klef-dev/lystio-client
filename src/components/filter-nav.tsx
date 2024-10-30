"use client";
import { ChevronDownIcon, SlidersHorizontalIcon } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow
} from "@/components/ui/popover";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const FilterNav = () => {
  return (
    <nav className="">
      <ul className="container mx-auto  py-5 flex items-center space-x-4">
        {filter_methods.map((method) => (
          <DropdownMenu key={method}>
            <DropdownMenuTrigger asChild>
              <li
                key={method}
                className="text-sm gap-2 flex items-center cursor-pointer"
              >
                <span>{method}</span>
                <ChevronDownIcon size={14} />
              </li>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Option 1</DropdownMenuItem>
              <DropdownMenuItem>Option 2</DropdownMenuItem>
              <DropdownMenuItem>Option 3</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
        <Popover>
          <PopoverTrigger asChild>
            <li className="text-sm gap-2 flex items-center cursor-pointer">
              <span>
                Price: <span className="text-gray-500">€300 - €500</span>
              </span>
              <ChevronDownIcon size={14} />
            </li>
          </PopoverTrigger>
          <PopoverContent className="p-2 space-y-2 max-w-sm">
            <PopoverArrow />
            <div className="flex flex-row items-center gap-2">
              <div className="gap-1">
                <label htmlFor="min-amount" className="text-xs">
                  min amount
                </label>
                <Input placeholder="min amount" type="number" />
              </div>
              <div className="gap-1">
                <label htmlFor="max-amount" className="text-xs">
                  max amount
                </label>
                <Input placeholder="max amount" type="number" />
              </div>
            </div>
            <Button className="w-full">Apply</Button>
          </PopoverContent>
        </Popover>

        <li className="text-sm gap-2 flex items-center">
          <span>All</span>
          <SlidersHorizontalIcon size={14} />
        </li>
      </ul>
    </nav>
  );
};

export default FilterNav;

const filter_methods = [
  "Rent",
  "Apartment",
  "Property type",
  "Beds/baths",
  "Living rooms",
  "Pets",
  "Deposit"
];
