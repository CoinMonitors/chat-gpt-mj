import { post, ResultData } from '@/services/index';

type TParams = {
    phoneNumber: number;
};

export namespace nsValidRegisteredPost {
    export const request = async (data: TParams) => {
        return post<ResultData<boolean>>('/api/v1/user/hasRegistered', data);
    };
}
