import { VerifiedIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Skeleton } from "./ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem
  //   CarouselNext,
  //   CarouselPrevious
} from "@/components/ui/carousel";

const ListingCard = ({ property }: { property: PropertyType }) => {
  return (
    <div className="w-full">
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {property.media.map((media) => (
            <CarouselItem key={media.id}>
              <div className="w-full aspect-[372/302]  rounded-lg overflow-hidden relative border">
                <Image
                  src={media.cdnUrl}
                  blurDataURL={media.bluredDataURL}
                  className=" object-cover w-full h-full "
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
