"use client";
import React from "react";

import ListingCard, { ListingCardSkeleton } from "./listing-card";
import { ScrollArea } from "./ui/scroll-area";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { createQueryString } from "@/lib/utils";

const Listings = ({
  data,
  isLoading,
}: {
  data?: {
    res: PropertyType[];
    paging: PaginationType;
  };
  isLoading: boolean;
}) => {
  if (isLoading) return <ListingFallback />;

  return (
    <ScrollArea className="w-full flex-grow">
      <div className="grid grid-cols-2 gap-10 p-5 w-full h-full">
        {data?.res?.map((property) => (
          <ListingCard key={property.id} property={property} />
        ))}
        {data?.paging && (
          <div className="col-span-2">
            <ListingPagination paging={data?.paging} />
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default Listings;

const ListingFallback = () => (
  <div className="grid grid-cols-2 gap-10 p-5 w-full h-full flex-grow overflow-hidden">
    {Array.from({ length: 10 }).map((_, i) => (
      <ListingCardSkeleton key={i} />
    ))}
  </div>
);

const ListingPagination = ({ paging }: { paging: PaginationType }) => {
  const searchParams = useSearchParams();

  const pathname = usePathname();

  const page = +(searchParams.get("page") || 1);

  const { nextURL, prevURL } = React.useMemo(() => {
    let nextURL = "#",
      prevURL = "#";

    const queries = Object.fromEntries(searchParams.entries());

    if (page > 1) {
      prevURL = createQueryString(pathname, { ...queries, page: page - 1 });
    }

    if (page < paging.pageCount) {
      nextURL = createQueryString(pathname, { ...queries, page: page + 1 });
    }

    return { prevURL, nextURL };
  }, [page, paging.pageCount, pathname, searchParams]);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={prevURL} />
        </PaginationItem>
        <PaginationItem>
          Page {page} of {paging.pageCount}
        </PaginationItem>
        <PaginationItem>
          <PaginationNext prefetch href={nextURL} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
