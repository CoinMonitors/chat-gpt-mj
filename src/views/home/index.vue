<template>
    <div id="app-page-home">
        <header class="app-header con">
            <span>logo</span>
            <span>小程序</span>
            <span>说明</span>
            <span>充值</span>
            <el-dropdown v-if="isLogin">
                <span class="el-dropdown-link">
                    {{ userName }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="handleLoginOut">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <span v-else @click="handleGoLogin">Login</span>
        </header>
        <main>
            <div class="text-info-wrap">
                <h1>想象这样一个场所……</h1>
                <div class="text-medium">
                    在这里，您可以加入校园俱乐部、游戏群组，或是世界级艺术社区。在这里，您也能邀三五好友一起共度欢乐时光。在这里，您可以轻而易举地每日谈天说地，时常消遣娱乐。
                </div>
            </div>
            <div class="opt-content-wrap">
                <div class="start-create button-large" @click="handleGoCreation">开始创作</div>
                <div class="image-square button-large">画廊</div>
            </div>
            <div class="main-background-image">
                <img class="backgroundImages" src="../../assets/svgs/home-main.svg" alt="" />
                <img class="foregroundLeft" src="../../assets/svgs/home-left.svg" alt="" />
                <img class="foregroundRight" src="../../assets/svgs/home-right.svg" alt="" />
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { nsUserInfoPost } from '@/services/login';
import { ArrowDown } from '@element-plus/icons-vue';
import { getStorage, setStorage } from '@/utils/localStorage';

let userName = ref('');
let token = ref('');
const router = useRouter();

const handleGoCreation = () => {
    router.push({
        path: 'start-creation'
    });
};

const handleGoLogin = () => {
    router.push({
        path: 'user-login'
    });
};

const isLogin = computed(() => {
    return !!token.value;
});

const getUserInfo = async () => {
    const res = await nsUserInfoPost.request();
    if (res.code === 200) {
        userName.value = res.data.phone;
    }
};

const handleLoginOut = async () => {
    token.value = '';
    setStorage('X-token', '');
};

onMounted(() => {
    token.value = getStorage('X-token');
    if (token.value) {
        getUserInfo();
    }
});
</script>

<style lang="less" scoped>
@import '../../styles/home/index.less';
</style>
