import axios, { AxiosResponse } from "axios";

const axios_client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "content-type": "application/json",
  },
});

const get = async (endpoint: string) => {
  return axios_client.get(endpoint).then(getResponse);
};

const post = async <T extends object, P extends object>(
  endpoint: string,
  payload: P
) => {
  return axios_client.post(endpoint, payload).then(getResponse<T>);
};

const getResponse = <T>(res: AxiosResponse) => res.data as T;

const request = { get, post };
export default request;
