import axios from 'axios';
import type { AxiosError } from 'axios';

interface ErrorData {
    message?: string;
}

export class ApiError extends Error {
    readonly isOffline: boolean;
    readonly status?: number;

    constructor(message: string, isOffline = false, status?: number) {
        super(message);
        this.isOffline = isOffline;
        this.status = status;
    }
}

const http = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || '/api',
    timeout: 8000,
});

http.interceptors.response.use(
    r => r,
    (err: AxiosError) => {
        const offline = !err.response;
        const status = err.response!.status;
        const message = (err.response?.data as ErrorData)?.message || 'Erro desconhecido';


        return Promise.reject(new ApiError(message, offline, status));
    },
);

export function useApi() {
    return {
        get: <T>(url: string) => http.get<T>(url).then(r => r.data),
        post: <T, D = unknown>(url: string, body: D) =>
            http.post<T>(url, body).then(r => r.data),
        del: <T>(url: string) => http.delete<T>(url).then(r => r.data),
    };
}
