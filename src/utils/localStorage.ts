/**
 * 设置本地存储
 */
export const setStorage = (key: string, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value));
};

/**
 * 获取本地存储
 */
export const getStorage = (key: string) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
};
