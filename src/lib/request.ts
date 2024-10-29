import axios, { AxiosResponse } from 'axios';

const axios_client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'content-type': 'application/json',
    },
});

const get = async (endpoint: string) => {
    return axios_client.get(endpoint).then(setResponse);
};

const setResponse = (res: AxiosResponse) => res.data;

const request = { get };
export default request;