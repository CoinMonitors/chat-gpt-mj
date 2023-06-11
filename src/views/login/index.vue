<template>
    <div class="login-main-page">
        <!-- <div class="home-bg"></div> -->
        <div class="back-button" @click="handleBack">
            <el-icon><Back /></el-icon>返回首页
        </div>
        <div class="login-body">
            <div class="show-user-opt-wrap">
                <Login v-if="activeType === 'Login'" @swich-login-type="triggerLoginType"></Login>
                <Register v-else @swich-login-type="triggerLoginType"></Register>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Login from './components/login.vue';
import Register from './components/register.vue';
const router = useRouter();
const activeType = ref('Login');

const triggerLoginType = () => {
    if (activeType.value === 'Login') {
        activeType.value = 'Register';
    } else {
        activeType.value = 'Login';
    }
};

const handleBack = () => {
    router.push({
        path: '/'
    });
};
</script>
