<!--
 * @Author: zch1999 1901394767@qq.com
 * @Date: 2023-05-04 17:52:03
 * @LastEditors: zch1999 1901394767@qq.com
 * @LastEditTime: 2023-05-14 19:44:51
 * @FilePath: /chat-gpt-mj/src/views/start-creation/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="start-creation">
        <el-form :model="baseData" class="base">
            <el-form-item class="base-item" prop="prompt">
                <el-input type="textarea" class="base-input" v-model="baseData.prompt"></el-input>
            </el-form-item>
            <el-form-item class="base-item" prop="imagePrompt">
                <!-- <el-input type="textarea" class="base-input" v-model="baseData.imagePrompt"></el-input> -->
                <el-upload
                    class="avatar-uploader"
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    :show-file-list="false"
                >
                    <img v-if="baseData.imagePrompt" :src="baseData.imagePrompt" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">+</el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item class="base-item" prop="imageUrlPrompt">
                <el-input type="textarea" class="base-input" v-model="baseData.imageUrlPrompt"></el-input>
            </el-form-item>
        </el-form>
        <el-form :model="resParams" v-if="modelParam.length > 0" class="params" :label-position="'top'">
            <el-form-item label="模型">
                <el-select v-model="selModelId" v-if="models.length" @change="handleModelChage">
                    <el-option
                        v-for="(item, index) in models"
                        :key="index"
                        :value="item.model_id"
                        :label="item.model_name"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                v-for="(item, index) in modelParam"
                :key="index"
                :label="item.nameZh"
                class="create-item"
                :prop="resParams[item.id]"
            >
                <el-input v-if="item.controlType == 'input'" v-model="resParams[item.id]" :max="Number(item.maximum)" />
                <el-slider
                    v-else-if="item.controlType == 'slider'"
                    v-model="resParams[item.id]"
                    :max="Number(item.maximum)"
                />
                <el-select v-else-if="item.controlType == 'select'" v-model="resParams[item.id]">
                    <el-option v-for="(i, index) in item.data" :key="index" :label="i" :value="i" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">Submit</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { nsCommonModelPost } from '@/services/common/login';
import { creteDrawPost } from '@/services/create';
import creation from '@/constant/creation';

type modelType = {
    model_name?: string;
    model_id?: string;
};
type paramsType = {
    [key: string]: any;
};

const props = defineProps({
    changeTaskId: Function
});

const resParams = ref<{
    [key: string]: any;
}>({});
const baseData = ref<{
    [key: string]: any;
}>({});
const models = ref<modelType[]>([]);
const selModelId = ref<string>('');
const modelParam = ref<paramsType[]>([]);
const getData = async () => {
    const res = await nsCommonModelPost.request(selModelId.value);
    if (res.code === 200) {
        let { modelParams } = res.data;
        console.log(res.data, creation, modelParams); //jing-log
        modelParam.value = fliterParams(modelParams);
        modelParams.forEach((item: { [key: string]: any }) => {
            resParams.value[item.id] = item.defaultValue;
        });
    }
};

// 获取所有模型
const getModels = async () => {
    const res = await creteDrawPost.getModels();
    if (res.code == 200) {
        models.value = res.data;
        selModelId.value = res.data[0].model_id;
    }
    console.log(res, models, 'models');
};

// 去除基础属性
const fliterParams = (arr: any[]) => {
    return arr.filter((item: any) => item.id !== 'prompt' && item.id !== 'imgUrl' && item.id !== 'imgPrompt');
};
const handleModelChage = (value: string) => {
    console.log(value);
    getData();
};

onMounted(async () => {
    await getModels();
    getData();
});

const submitForm = async () => {
    console.log({ modelId: selModelId.value, modelParams: { ...resParams.value, ...baseData.value } });
    const res = await nsCommonModelPost.creteDrawPost({
        modelId: selModelId.value,
        modelParams: { ...resParams.value, ...baseData.value }
    });
    props.changeTaskId && props.changeTaskId(res.data.taskId);
    console.log(resParams.value, baseData.value, 'res');
};
</script>

<style lang="less" scoped>
.start-creation {
    width: 100%;
    min-width: 600px;
    display: flex;
    align-items: center;
}
.create-item {
    width: 100%;
    margin-bottom: 10px;
}
.base {
    width: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // flex-wrap: wrap;
    .base-item {
        width: 30%;
        .base-input {
            height: 250px;
            :deep(.el-textarea__inner) {
                height: 100%;
                resize: none;
                color: #ffffff;
                background-color: #5a5a56;
                box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
            }
        }
        .avatar-uploader {
            width: 100%;
            :deep(.el-upload) {
                width: 100%;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
                transition: var(--el-transition-duration-fast);
            }
        }
    }
}
.params {
    width: 30%;
    height: 100%;
    padding: 15px;
    margin-left: 50px;
    box-sizing: border-box;
    background-color: #5a5a56;
    :deep(.el-form-item__label) {
        color: #ffffff;
    }
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100%;
    height: 250px;
    text-align: center;
    background-color: #5a5a56;
}
</style>
