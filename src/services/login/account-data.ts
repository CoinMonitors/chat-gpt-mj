import { post, ResultData } from '@/services/index';

type IReturn = {
    token: string;
    phone: string;
};
export namespace nsUserInfoPost {
    export const request = async () => {
        return post<ResultData<IReturn>>('/api/v1/account/data');
    };
}
