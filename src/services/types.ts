// 定义请求响应参数，不含data
interface Result {
    code: number;
    msg: string;
}

// 请求响应参数，包含data
interface ResultData<T> extends Result {
    data: T;
}

export type { ResultData };
