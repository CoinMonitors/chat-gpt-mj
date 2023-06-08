import { post, ResultData } from '@/services/index';

export namespace nsCommonModelPost {
    export const request = async (id: string) => {
        return post<ResultData<any>>(`/api/v1/model/modelDetails/${id}`);
    };
    export const creteDrawPost = async (data: any) => {
        return post<ResultData<any>>('/api/v1/text2img/create', data);
    };
    export const getDrawResult = async (path: string) => {
        return post<ResultData<any>>(`/api/v1/text2img/obtainingResults/${path}`);
    };
}
