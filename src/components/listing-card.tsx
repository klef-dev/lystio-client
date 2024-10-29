import { VerifiedIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const img =
  "https://images.unsplash.com/photo-1499955085172-a104c9463ece?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const ListingCard = () => {
  return (
    <div className="w-full">
      <div className="w-full aspect-[372/302]  rounded-lg overflow-hidden relative border">
        <Image
          src={img}
          className=" object-cover w-full h-full "
          alt=""
          layout="fill"
        />
      </div>
      <div className="flex flex-col gap-y-3 p-2">
        <div
          className="flex items-center justify-between
        "
        >
          <span className="flex items-center gap-2 text-primary text-sm font-medium">
            <VerifiedIcon className=" fill-primary stroke-white" size={20} />
            Verified
          </span>
          <span className="text-xs text-gray-500 font-medium">5 days ago</span>
        </div>
        <p className="text-base font-bold line-clamp-1">
          Elegant 5-room apartment with spacious rooftop terrace and stunning
          views
        </p>
        <p className="text-xs text-gray-500 font-medium">
          Reichsratsstraße 13, 1010 Vienna
        </p>
        <p className="text-base font-bold line-clamp-1">
          2,000 € - 5,000 € Multi-units
        </p>
        <p className="text-xs text-gray-500 font-medium">
          Available From:{" "}
          <span className="text-black font-semibold">Immediately</span>
        </p>
      </div>
    </div>
  );
};

export default ListingCard;
