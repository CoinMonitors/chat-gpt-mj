<template>
    <div class="user-register-wrap">
        <el-form size="large" ref="formVerifyRef" :model="formVerify" :rules="rulesVerify">
            <el-form-item prop="phone">
                <el-input
                    type="number"
                    class="form-item"
                    v-model="formVerify.phone"
                    placeholder="请输入手机号码"
                    clearable
                    :prefix-icon="Lock"
                ></el-input>
            </el-form-item>
            <el-form-item prop="verifyCode">
                <el-input class="form-item" placeholder="请输入验证码" v-model="formVerify.verifyCode" ref="verifyRef">
                    <template #append>
                        <el-button type="primary" @click="getVerifyCode" :disabled="disabledVerify">{{
                            verify.buttonText
                        }}</el-button>
                    </template>
                </el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { Lock } from '@element-plus/icons-vue';
import { validMobile } from '@/utils';
import { FormRules, ElMessage } from 'element-plus';

// 验证码登录
const formVerify = ref({
    phone: '',
    verifyCode: ''
});

const validPhone = (rule: any, value: string, callback: any) => {
    if (!value) {
        return callback(new Error('请输入电话号码'));
    } else if (!validMobile(value)) {
        return callback(new Error('请输入真实手机号码'));
    } else {
        callback();
    }
};

const rulesVerify = reactive<FormRules>({
    phone: [{ required: true, trigger: 'blur', validator: validPhone }],
    verifyCode: [{ required: true, trigger: 'blur', message: '请输入验证码' }]
});

const verify = reactive({
    count: 11,
    buttonText: '获取验证码'
});

const disabledVerify = computed(() => {
    return !formVerify.value.phone || verify.count <= 10;
});
const getVerifyCode = () => {
    // 校验手机号码
    if (!validMobile(formVerify.value.phone)) return;
    ElMessage.success('验证码发送成功，请查看');

    verify.count--;
    verify.buttonText = verify.count + ' 秒后重新获取验证码';
    timer = window.setInterval(() => {
        if (verify.count <= 1) {
            resetCount();
            verify.buttonText = '重新发送验证码';
            verify.count = 11;
            return;
        }
        verify.count--;
        verify.buttonText = verify.count + ' 秒后重新获取验证码';
    }, 1000);
};

let timer = 0;
// 验证码
const resetCount = () => {
    clearInterval(timer);
    timer = 0;
};
onMounted(() => {
    resetCount();
});
</script>
