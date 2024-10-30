import { fetchListing } from "@/utils/actions";

import useSWR from "swr";

const useListings = (filter: FilterType) => {
  const { data, ...rest } = useSWR(
    [filter],
    ([filter]) => fetchListing(filter),
    {
      keepPreviousData: true,
      refreshInterval: 60000
    }
  );

  return { data, ...rest };
};

export default useListings;
