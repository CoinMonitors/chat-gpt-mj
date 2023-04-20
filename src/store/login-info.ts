import { defineStore } from 'pinia';
import { Names } from '@/store/store-namespace';
import { setStorage } from '@/utils/localStorage';

type TLoginRes = {
    id?: number;
    name?: string;
    token?: string;
} | null;
export const useLoginStore = defineStore(Names.LoginInfo, () => {
    // token
    const token = ref<string>('');
    function setToken(state: string) {
        token.value = state;
        setStorage('nid', state);
    }
    function getToken() {
        return token.value;
    }

    // login-info
    const loginData = ref<TLoginRes>();

    function setLoginData(data: TLoginRes) {
        loginData.value = data;
        if (data) {
            setStorage('nid', data.token);
            setStorage('uid', data.id);
        } else {
            setStorage('nid', '');
            setStorage('uid', '');
        }
    }

    return { token, getToken, setToken, loginData, setLoginData };
});
