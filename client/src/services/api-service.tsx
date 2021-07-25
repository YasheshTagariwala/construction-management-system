import axios, {AxiosRequestConfig} from 'axios';
import {getSessionCookie, setSessionCookie} from "./localstorage-service";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 120 * 1000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': ' application/json'
    }
})

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
    let userSession = getSessionCookie();

    if (config.headers.hasOwnProperty('Skip-Headers')) {
        delete config.headers['Skip-Headers'];
    } else {
        config.headers.Authorization = userSession.token

        delete config.headers['Skip-Headers'];
    }
    return config;
});

axiosInstance.interceptors.response.use((response) => {
    if (response.data) {
        if (response.data.message === 'Unauthorized') {
            let session = {
                authenticated: false,
                user: {
                    role: "visitor"
                },
                accessToken: ""
            };
            setSessionCookie(session);
            window.location.href = `${process.env.REACT_APP_BASE_URL}`
        }
    }
    return response.data;
});

export default class ApiService {
    static callPost(url: string, payload: any, headers: any = {}, options = {}) {
        return axiosInstance.post(url, payload, {
            headers: {
                ...headers
            },
            ...options
        })
    }

    static callGet(url: string, params: any, headers: any = {}) {
        return axiosInstance.get(url, {
            headers: {
                ...headers
            },
            params: params
        });
    }

    static callPut(url: string, payload: any, headers: any = {}) {
        return axiosInstance.put(url, payload, {
            headers: {
                ...headers
            }
        });
    }

    static callDelete(url: string, params: any, headers: any = {}) {
        return axiosInstance.delete(url, {
            headers: {
                ...headers
            },
            params: params
        });
    }
}
