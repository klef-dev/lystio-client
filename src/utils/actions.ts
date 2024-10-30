import request from "@/lib/request";
import { AxiosError } from "axios";

export const fetchListing = async (payload: FilterType) => {
  try {
    const data = await request.post<
      { res: PropertyType[]; paging: PaginationType },
      FilterType
    >("/tenement/search", payload);

    return data;
  } catch (error) {
    const { message } = error as AxiosError;
    throw new Error(message);
  }
};
