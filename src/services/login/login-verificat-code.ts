import { post, Result } from '@/services/index';

type TParams = {
    phoneNumber: number;
};

export namespace nsGetVerificationCodePost {
    export const request = async (data: TParams) => {
        return post<Result>('/api/v1/user/obtainVerificationCode', data);
    };
}
