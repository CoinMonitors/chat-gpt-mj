<template>
    <div class="user-login-wrap">
        <div class="login-form-title">密码登录</div>
        <el-form size="large" ref="ruleFormRef" :model="formCode" :rules="rulesCode">
            <el-form-item prop="phoneNumber">
                <el-input
                    class="form-item"
                    clearable
                    :prefix-icon="User"
                    v-model="formCode.phoneNumber"
                    placeholder="请输入手机号码"
                ></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                    class="form-item"
                    :prefix-icon="Lock"
                    v-model="formCode.password"
                    placeholder="请输入密码"
                    show-password
                    clearable
                    ref="passwordRef"
                ></el-input>
            </el-form-item>
        </el-form>
        <div class="other-opt">
            <span @click="handleChangeLoginType">验证码登录</span>
            <span>忘记密码</span>
        </div>

        <div class="login-button" @click="handleLogin">登录</div>
    </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue';
import type { FormInstance, FormRules } from 'element-plus';
import { validMobile } from '@/utils';
import { nsUserLoginPost } from '@/services/login/login';

const validPhone = (rule: any, value: string, callback: any) => {
    if (!value) {
        return callback(new Error('请输入电话号码'));
    } else if (!validMobile(value)) {
        return callback(new Error('请输入真实手机号码'));
    } else {
        callback();
    }
};
const validPswd = (rule: any, value: string, callback: any) => {
    if (!value) {
        return callback(new Error('请输入密码'));
    } else {
        callback();
    }
};

const ruleFormRef = ref<FormInstance>();
const emit = defineEmits(['swich-login-type']);

const formCode = ref({
    phoneNumber: '',
    password: ''
});
const rulesCode = reactive<FormRules>({
    phoneNumber: [{ required: true, trigger: 'blur', validator: validPhone }],
    password: [{ required: true, trigger: 'blur', validator: validPswd }]
});
const handleLogin = async () => {
    const valid = await ruleFormRef.value?.validate();
    if (!valid) return;
    const parasm = {
        ...formCode.value
    };
    const res = await nsUserLoginPost.request(parasm);
    console.log(res);
    if (res.code === 200) {
        console.log(res);
    }
};

const handleChangeLoginType = () => {
    emit('swich-login-type');
};
</script>
