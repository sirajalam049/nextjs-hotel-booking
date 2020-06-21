import Axios, { AxiosRequestConfig, AxiosError } from 'axios';
import config from 'config/config';
import AuthService from 'models/auth';

Axios.defaults.headers.post['Content-Type'] = 'application/json';

export const localAxios = Axios.create({
    baseURL: config.get('LOCAL_API_URL'),
});

export const externalAxios = Axios.create({
    baseURL: config.get("EXTERNAL_API_URL")
});

const error401 = (error: AxiosError) => {
    if (error.response?.status === 401) {
        AuthService.logout();
    }
    return Promise.reject(error);
}

externalAxios.interceptors.response.use(_ => _, error401);

localAxios.interceptors.response.use(_ => _, error401);

export const localRequest = async<T = Record<string, any>>(config: AxiosRequestConfig): Promise<T> => {
    if (!localAxios.defaults.baseURL) {
        throw new Error('Error: Base Url is not provided');
    }
    const resp = await localAxios.request<T>(config);
    return resp.data;
};

export const externalRequest = async <T = Record<string, any>>(config: AxiosRequestConfig): Promise<T> => {
    if (!externalAxios.defaults.baseURL) {
        throw new Error('Error: Base Url is not provided');
    }
    const resp = await localAxios.request<T>(config);
    return resp.data;
}