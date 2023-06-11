<template>
    <div class="user-register-wrap">
        <div class="register-form-title">登录/注册</div>
        <div class="text-info">未注册用户会直接帮您注册哦~</div>
        <el-form size="large" ref="ruleFormRef" :model="formVerify" :rules="rulesVerify">
            <el-form-item prop="phone">
                <el-input
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
                        <el-button type="primary" @click="handleVerifyCode" :disabled="disabledVerify"
                            >{{ verify.buttonText }}<el-icon v-if="isLoading"><Loading /></el-icon
                        ></el-button>
                    </template>
                </el-input>
            </el-form-item>
        </el-form>
        <div class="other-opt">
            <span></span>
            <span @click="handleChangeLoginType">密码登录</span>
        </div>
        <div class="login-button" @click="handleLogin">登录/注册</div>
    </div>
</template>

<script setup lang="ts">
import { Lock } from '@element-plus/icons-vue';
import { validMobile } from '@/utils';
import { FormRules, ElMessage, FormInstance } from 'element-plus';
import {
    nsGetVerificationCodePost,
    nsValidRegisteredPost,
    nsUserRegisterPost,
    nsUserLoginPost
} from '@/services/login';
import { setStorage } from '@/utils/localStorage';

const router = useRouter();

const validPhone = (rule: any, value: string, callback: any) => {
    if (!value) {
        return callback(new Error('请输入电话号码'));
    } else if (!validMobile(value)) {
        return callback(new Error('请输入真实手机号码'));
    } else {
        callback();
    }
};

let timer = 0;

const isLoading = ref(false);

const rulesVerify = reactive<FormRules>({
    phone: [{ required: true, trigger: 'blur', validator: validPhone }],
    verifyCode: [{ required: true, trigger: 'blur', message: '请输入验证码' }]
});

// 验证码登录
const formVerify = reactive({
    phone: '',
    verifyCode: ''
});

const verify = reactive({
    count: 60,
    buttonText: '获取验证码'
});

const ruleFormRef = ref<FormInstance>();
const emit = defineEmits(['swich-login-type']);

const disabledVerify = computed(() => {
    return !formVerify.phone || verify.count <= 10;
});

const handleVerifyCode = async () => {
    // 校验手机号码
    if (!validMobile(formVerify.phone)) return;
    isLoading.value = true;
    getVerifyCode();
};

// 获取验证码逻辑
const getVerifyCode = async () => {
    const res = await nsGetVerificationCodePost.request({ phoneNumber: parseInt(formVerify.phone, 10) });
    if (res.code === 200) {
        isLoading.value = false;
        ElMessage.success(res.msg);
        verify.count--;
        verify.buttonText = verify.count + ' 秒后重新获取';
        timer = window.setInterval(() => {
            if (verify.count <= 1) {
                resetCount();
                verify.buttonText = '重新发送验证码';
                verify.count = 60;
                return;
            }
            verify.count--;
            verify.buttonText = verify.count + ' 秒后重新获取';
        }, 1000);
    }
};

// 重置验证码
const resetCount = () => {
    clearInterval(timer);
    timer = 0;
};

// 切换登录方式
const handleChangeLoginType = () => {
    emit('swich-login-type');
};
const handleLogin = async () => {
    const valid = await ruleFormRef.value?.validate();
    if (!valid) return;
    const res = await nsValidRegisteredPost.request({ phoneNumber: parseInt(formVerify.phone, 10) });
    if (res.data) {
        userLogin();
    } else {
        userRegister();
    }
};

// 用户注册
const userRegister = async () => {
    const res = await nsUserRegisterPost.request({ phoneNumber: formVerify.phone, code: formVerify.verifyCode });
    if (res.code === 200) {
        ElMessage.success(res.msg);
        setStorage('X-token', res.data.token);
        router.push({
            path: '/'
        });
    }
};

// 用户登录
const userLogin = async () => {
    const res = await nsUserLoginPost.request({ phoneNumber: formVerify.phone, code: formVerify.verifyCode });
    if (res.code === 200) {
        ElMessage.success(res.msg);
        setStorage('X-token', res.data.token);
        router.push({
            path: '/'
        });
    }
};

onMounted(() => {
    resetCount();
});
</script>
