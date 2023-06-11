import { post, ResultData } from '@/services/index';

type TParams = {
    phoneNumber: string;
    code: string;
};

type IReturn = {
    token: string;
    phone: string;
};

export namespace nsUserRegisterPost {
    export const request = async (data: TParams) => {
        return post<ResultData<IReturn>>('/api/v1/user/register', data);
    };
}
