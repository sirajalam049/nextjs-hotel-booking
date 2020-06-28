import { externalAxios, externalRequest, localAxios, localRequest } from "resources/utils";
import { User } from "models/user/@types";

export type LocalStorageVariable = 'access_token' | 'profile';

// utils/AuthService.js
export default class AuthService {

    static signUp = async (data: { firstName: string, lastName: string, email: string, password: string }) => {
        await localRequest<User>({ url: '/users/signup', method: 'post', data }).catch(err => { throw err });
        return await AuthService.login({ email: data.email, password: data.password });
    }

    static login = async (data: { email: string, password: string }) => {
        const res = await externalRequest<{ id: string }>({ url: '/users/login', method: 'post', data }).catch(err => {
            throw err;
        });
        return await AuthService.loadUser(res.id);
    }

    static loadUser = async (token: string) => {
        AuthService.setToken(token);
        const profile = await externalRequest<User>({ url: '/users/me' }).catch(err => { throw err });
        localStorage.setItem('profile', JSON.stringify(profile));
        return profile;
    }

    static setToken = (token: string) => {
        externalAxios.defaults.headers.common['Authorization'] = token
        localAxios.defaults.headers.common['Authorization'] = token;
        localStorage.setItem('access_token', token);
    }

    static getToken = () => localStorage.getItem('access_token');

    static getProfile = (): User | undefined => {
        let profile = localStorage.getItem('profile');
        if (profile) return JSON.parse(profile);
        else return;
    }

    static logout = () => {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('profile');
    }

    static loggedIn = () => {
        // Checks if there is a saved token and it's still valid
        const token = AuthService.getToken();
        return !!token;
        // const isExpired = await AuthService.isTokenExpired(token).catch(err => { });
        // return !!isExpired;
    }

    // static isTokenExpired = async (token: string): Promise<boolean> => {
    //     const res = await externalRequest({ url: 'users/me' }).catch(err => { });
    //     return res ? false : true;
    // }

}