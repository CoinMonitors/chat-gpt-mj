import service from '@/services/request';
export interface Result {
    code: number;
    msg: string;
}

// 请求响应参数，包含data
export interface ResultData<T> extends Result {
    data: T;
}
// 常用方法封装
export function get<T>(url: string, params?: object): Promise<ResultData<T>> {
    return service.get(url, params);
}

export function post<T>(url: string, params?: object, config?: object): Promise<T> {
    return service.post(url, params, config);
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
