import { post } from '@/services/index';
export interface TUsersInfo {
    id: number;
    name: string;
    token: string;
}

type IReturn = TUsersInfo;

export namespace nsCommonLoginPost {
    interface IParams {
        name: string;
        password: string;
    }

    export const request = async (params: IParams) => {
        return post<IReturn>('/api/login', params);
    };
}
