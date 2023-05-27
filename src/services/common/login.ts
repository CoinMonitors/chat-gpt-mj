import { post, ResultData } from '@/services/index';

export namespace nsCommonModelPost {
    export const request = async () => {
        return post<ResultData<any>>('/api/v1/model/modelDetails/openjourney');
    };
    export const creteDrawPost = async (data: any) => {
        return post<ResultData<any>>('/api/v1/text2img/create', data);
    };
    export const getDrawResult = async (path: string) => {
        return post<ResultData<any>>(`/api/v1/text2img/obtainingResults/${path}`);
    };
}
