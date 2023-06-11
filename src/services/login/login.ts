import { post, ResultData } from '@/services/index';

type TParams = {
    phoneNumber: string;
    password?: string;
    code?: string;
};

type TReturn = {
    phone?: string;
    token?: string;
};

export namespace nsUserLoginPost {
    export const request = async (data: TParams) => {
        return post<ResultData<TReturn>>('/api/v1/user/login', data);
    };
}
