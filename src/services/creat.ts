import { post, ResultData } from '@/services/index';

export namespace creteDrawPost {
    export const request = async () => {
        return post<ResultData<any>>('/api/v1/text2img/create');
    };
}
