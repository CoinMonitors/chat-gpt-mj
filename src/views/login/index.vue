<template>
    <div class="login-main-page">
        <div class="home-bg"></div>
        <div class="login-body">
            <el-tabs v-model="tabActive">
                <el-tab-pane label="账号登录" name="Login"></el-tab-pane>
                <el-tab-pane label="验证码登录" name="Register"></el-tab-pane>
            </el-tabs>
            <div class="show-user-opt-wrap">
                <component :is="tabActive"></component>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Login from './components/login.vue';
import Register from './components/register.vue';
// 切换登录方式
const tabActive = ref('');

watch(tabActive, (val) => {
    console.log(val);
});
</script>

<style lang="less" scoped>
.login-main-page {
    width: 100%;
    height: 100%;
    .home-bg {
        background-image: url('@/assets/images/login-background.png');
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        background-repeat: no-repeat;
        background-size: 1920px 1080px;
        background-position: 50%;
    }
}

.login-body {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.form-view {
    width: 100%;
    height: 200px;
}

.form-item {
    margin-top: 20px;
}

.form-operation {
    height: 50px;
    line-height: 50px;
}

.el-input-group__append button.el-button.is-disabled {
    color: #c1c1c1 !important;
}

.el-form-item--large {
    margin-bottom: 0;
}
</style>
