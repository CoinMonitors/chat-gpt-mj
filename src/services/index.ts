import service from '@/services/request';
// import type { ResultData } from '@/services/types';

// 常用方法封装
export function get<T>(url: string, params?: object): Promise<T> {
    return service.get(url, params);
}

export function post<T>(url: string, params?: object): Promise<T> {
    return service.post(url, params);
}

export function put<T>(url: string, params?: object): Promise<T> {
    return service.put(url, params);
}

export function deleteMethod<T>(url: string, params?: object): Promise<T> {
    return service.delete(url, params);
}

export function patch<T>(url: string, params?: object): Promise<T> {
    return service.patch(url, params);
}
