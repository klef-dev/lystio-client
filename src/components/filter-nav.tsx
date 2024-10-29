import { ChevronDownIcon, SlidersHorizontalIcon } from "lucide-react";
import React from "react";

const FilterNav = () => {
  return (
    <nav className="">
      <ul className="container mx-auto  py-5 flex items-center space-x-4">
        {filter_methods.map((method) => (
          <li key={method} className="text-sm gap-2 flex items-center">
            <span>{method}</span>
            <ChevronDownIcon size={14} />
          </li>
        ))}
        <li className="text-sm gap-2 flex items-center">
          <span>
            Price: <span className="text-gray-500">€300 - €500</span>
          </span>
          <ChevronDownIcon size={14} />
        </li>
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
