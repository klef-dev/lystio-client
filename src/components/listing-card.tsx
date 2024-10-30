import { BookmarkIcon, VerifiedIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Skeleton } from "./ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { format } from "date-fns";

const ListingCard = ({ property }: { property: PropertyType }) => {
  return (
    <div className="w-full">
      <Carousel className="w-full aspect-[372/302]">
        <div className="absolute  w-full z-10  flex flex-col   justify-between h-full p-3">
          <div className="flex flex-row w-full space-x-2">
            {Object.values(property.amenitiesTexts)
              .splice(0, 2)
              .map((amenity) => (
                <Badge variant={"white"} size={"sm"} key={amenity}>
                  {amenity}
                </Badge>
              ))}
            <span className="flex-grow" />
            <Button variant={"white"} size={"icon-sm"} className="rounded-full">
              <BookmarkIcon size={14} />
            </Button>
          </div>
          <div className="flex flex-row items-center w-full justify-between">
            <CarouselPrevious />
            <CarouselNext />
          </div>
          <div></div>
        </div>
        <CarouselContent className="">
          {property.media?.map((media) => (
            <CarouselItem key={media.id}>
              <div className="w-full aspect-[372/302] rounded-lg overflow-hidden relative border">
                <Image
                  src={media.cdnUrl}
                  blurDataURL={media.bluredDataURL}
                  className=" object-cover w-full h-full z-0"
                  alt={property.title}
                  layout="fill"
                  placeholder="blur"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex flex-col gap-y-3 p-2">
        <div
          className="flex items-center justify-between
        "
        >
          <span className="flex items-center gap-1 text-primary text-sm font-medium">
            <VerifiedIcon className=" fill-primary stroke-white" size={20} />
            Verified
          </span>
          <span className="text-xs text-gray-500 font-medium">5 days ago</span>
        </div>
        <p className="text-base font-bold line-clamp-1">{property.title}</p>
        <p className="text-xs text-gray-500 font-medium line-clamp-2">
          {property.abstract}
        </p>
        <p className="text-base font-bold line-clamp-1">
          {property.unitType === "single" ? (
            <>{property.rent.toLocaleString()} € Single Unit</>
          ) : (
            <>
              {property.rentRange[0].toLocaleString()} € -{" "}
              {property.rentRange[1].toLocaleString()} € Multiple Units
            </>
          )}
        </p>
        <p className="text-xs text-gray-500 font-medium">
          Available From:{" "}
          <span className="text-black font-semibold">
            {property.availableFrom
              ? format(new Date(property.availableFrom), "dd-MM-yyyy")
              : "Immediately"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ListingCard;

export const ListingCardSkeleton = () => (
  <div className="w-full">
    <Skeleton className="w-full aspect-[372/302]  rounded-lg overflow-hidden relative border" />

    <div className="flex flex-col gap-y-3 p-2">
      <div className="flex items-center justify-between">
        <Skeleton className="w-20 h-4" />
        <Skeleton className="w-20 h-4" />
      </div>
      <Skeleton className="w-full h-6" />
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-1/2 h-6" />
      <Skeleton className="w-1/2 h-4" />
    </div>
  </div>
);
