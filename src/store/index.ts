import { useLoginStore } from '@/store/login-info';

export interface IAppStore {
    useLoginStore: ReturnType<typeof useLoginStore>;
}
const appStore: IAppStore = {} as IAppStore;
/**
 * 注册app状态库
 */
export const registerStore = () => {
    appStore.useLoginStore = useLoginStore();
};
export default appStore;
