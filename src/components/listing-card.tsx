"use client";
import {
  BathIcon,
  BedDoubleIcon,
  BookmarkIcon,
  BoxIcon,
  CircleXIcon,
  VerifiedIcon,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { Skeleton } from "./ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { format, formatDistanceToNow } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const ListingCard = ({ property }: { property: PropertyType }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const selectedId = searchParams.get("id");

  const setSelectListing = (id: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("id", id.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div
      className={cn("w-full cursor-pointer", {
        "border border-primary rounded-xl":
          selectedId === property.id.toString(),
      })}
      onClick={() => setSelectListing(property.id)}
    >
      <Carousel className="w-full aspect-[372/302]">
        <div className="absolute  w-full z-10  flex flex-col   justify-between h-full p-2 group">
          <div className="flex flex-row w-full space-x-1">
            {Object.values(property.amenitiesTexts)
              .splice(0, 2)
              .map((amenity) => (
                <Badge variant={"white"} size={"sm"} key={amenity}>
                  {amenity}
                </Badge>
              ))}
            <span className="flex-grow" />
            <Button
              variant={"white"}
              size={"icon-sm"}
              className="rounded-full flex-shrink-0"
            >
              <BookmarkIcon size={14} />
            </Button>
          </div>
          <div className="flex flex-row items-center w-full justify-between opacity-0 group-hover:opacity-100">
            <CarouselPrevious />
            <CarouselNext />
          </div>
          <div className="flex items-center justify-center w-full">
            <CarouselIndicator />
          </div>
        </div>
        <CarouselContent className="">
          {property.media?.map((media) => (
            <CarouselItem key={media.id}>
              <div className="w-full aspect-[372/302] rounded-lg overflow-hidden relative border">
                <Image
                  src={media.cdnUrl}
                  blurDataURL={media.bluredDataURL}
                  className=" object-cover w-full h-full z-0 rounded-lg"
                  alt={property.title}
                  layout="fill"
                  placeholder="blur"
                />
              </div>
            </CarouselItem>
          ))}
          <div className="w-full aspect-[372/302] rounded-lg overflow-hidden relative border">
            <Image
              src={"/images/placeholder.jpg"}
              blurDataURL={"/images/placeholder.jpg"}
              className=" object-cover w-full h-full z-0 rounded-lg"
              alt={property.title}
              layout="fill"
              placeholder="blur"
            />
          </div>
        </CarouselContent>
      </Carousel>
      <div className="flex flex-col gap-y-3 p-2">
        <div className="flex items-center justify-between">
          {property.verified ? (
            <span className="flex items-center gap-1 text-primary text-sm font-medium">
              <VerifiedIcon className=" fill-primary stroke-white" size={20} />
              Verified
            </span>
          ) : (
            <span className="flex items-center gap-1 text-gray-400 text-sm font-medium">
              <CircleXIcon size={20} />
              Not Verified
            </span>
          )}
          <span className="text-xs text-gray-500 font-medium text-right">
            {formatDistanceToNow(new Date(property.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>
        <p className="text-base font-bold line-clamp-1">{property.title}</p>
        <p className="text-xs text-gray-500 font-medium line-clamp-2">
          {property.address}
        </p>
        <ul className="flex flex-row items-center justify-between">
          <li className="flex items-center gap-2">
            <BoxIcon size={14} className="text-gray-400" />
            <span className="text-xs font-medium text-gray-600">
              {property.unitType === "single" ? (
                <>{property.size}m²</>
              ) : (
                <>
                  {property.sizeRange[0]}-{property.sizeRange[1]}m²
                </>
              )}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <BedDoubleIcon size={14} className="text-gray-400" />
            <span className="text-xs font-medium text-gray-600">
              {property.unitType === "single" ? (
                <>{property.rooms}bed</>
              ) : (
                <>
                  {property.roomsBedRange[0]}-{property.roomsBedRange[1]}bed
                </>
              )}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <BathIcon size={14} className="text-gray-400" />
            <span className="text-xs font-medium text-gray-600">
              {property.unitType === "single" ? (
                <>{property.roomsBath}bath</>
              ) : (
                <>
                  {property.roomsBathRange[0]}-{property.roomsBathRange[1]}bath
                </>
              )}
            </span>
          </li>
        </ul>
        <p className="text-base font-bold line-clamp-1">
          {property.unitType === "single" ? (
            <>{property.rent.toLocaleString()} €</>
          ) : (
            <>
              {property.rentRange[0].toLocaleString()} € -{" "}
              {property.rentRange[1].toLocaleString()} €
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
