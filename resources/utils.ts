import Axios, { AxiosRequestConfig } from 'axios';


export const request = async<T = Record<string, any>>(config: AxiosRequestConfig): Promise<T> => {
    if (!Axios.defaults.baseURL) {
        throw new Error('Error: Base Url is not provided');
    }
    const resp = await Axios.request<T>(config);
    return resp.data;
};