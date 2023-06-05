import { post, Result } from '@/services/index';

type TParams = {
    phoneNumber: string;
    password: string;
};

export namespace nsUserLoginPost {
    export const request = async (data: TParams) => {
        return post<Result>('/api/v1/user/login', data);
    };
}
