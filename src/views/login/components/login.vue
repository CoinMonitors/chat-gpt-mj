<template>
    <div class="user-login-wrap">
        <el-form size="large" ref="formCodeRef" :model="formCode" :rules="rulesCode">
            <el-form-item prop="phone">
                <el-input
                    class="form-item"
                    clearable
                    :prefix-icon="User"
                    v-model="formCode.phone"
                    placeholder="请输入手机号码"
                    type="number"
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
    </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue';
import type { FormRules } from 'element-plus';
import { validMobile, validPassword } from '@/utils';
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
    } else if (!validPassword(value)) {
        return callback(new Error('请输入6~14位包含字母和数字的密码'));
    } else {
        callback();
    }
};

const formCode = ref({
    phone: '',
    password: ''
});
const rulesCode = reactive<FormRules>({
    phone: [{ required: true, trigger: 'blur', validator: validPhone }],
    password: [{ required: true, trigger: 'blur', validator: validPswd }]
});
</script>

<style lang="less" scoped></style>
