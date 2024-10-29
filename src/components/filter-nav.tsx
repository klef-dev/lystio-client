import { ChevronDownIcon } from "lucide-react";
import React from "react";

const FilterNav = () => {
  return (
    <nav className="">
      <ul className="container mx-auto  py-4 flex items-center space-x-4">
        {filter_methods.map((method) => (
          <li key={method} className="text-sm gap-1 flex items-center">
            <span>{method}</span>
            <ChevronDownIcon size={16} />
          </li>
        ))}
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
