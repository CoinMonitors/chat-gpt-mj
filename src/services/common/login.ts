import { post, ResultData } from '@/services/index';

export namespace nsCommonLoginPost {
    export const request = async () => {
        return post<ResultData<any>>('/api/v1/model/modelDetails/openjourney');
    };
}
