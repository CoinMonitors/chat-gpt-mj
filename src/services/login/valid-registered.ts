import { post, Result } from '@/services/index';

type TParams = {
    phoneNumber: number;
};

export namespace nsValidRegisteredPost {
    export const request = async (data: TParams) => {
        return post<Result>('/api/v1/user/hasRegistered', data);
    };
}
