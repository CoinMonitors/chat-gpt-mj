<!--
 * @Author: zch1999 1901394767@qq.com
 * @Date: 2023-05-04 17:52:03
 * @LastEditors: zch1999 1901394767@qq.com
 * @LastEditTime: 2023-05-04 17:53:09
 * @FilePath: /chat-gpt-mj/src/views/start-creation/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="start-creation">
        <el-form :model="resParams" v-if="modelParam.length > 0">
            <el-form-item
                v-for="(item, index) in modelParam"
                :key="index"
                :label="item.nameZh"
                :label-position="'top'"
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
                    <el-option v-for="(item, index) in item.data" :key="index" :label="item" :value="item" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">Submit</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { nsCommonLoginPost } from '@/services/common/login';
import creation from '@/constant/creation';

const resParams = ref<{
    [key: string]: any;
}>({});
const modelParam = ref([]);
const getData = async () => {
    const res = await nsCommonLoginPost.request();
    if (res.code === 200) {
        let { modelParams } = res.data;
        console.log(res.data, creation, modelParams); //jing-log
        modelParam.value = modelParams;
        modelParams.forEach((item: { [key: string]: any }) => {
            resParams.value[item.id] = '2';
        });
    }
};

onMounted(() => {
    getData();
});

const submitForm = async () => {
    const res = await nsCommonLoginPost.creteDrawPost({
        modelId: 'openjourney',
        modelParams: resParams.value
    });
    console.log(resParams.value, res, 'res');
    const imgRes = await nsCommonLoginPost.getDrawResult(res.data.taskId);
    console.log(imgRes, 'img');
};
</script>

<style lang="less" scoped>
.start-creation {
    width: 60%;
    min-width: 600px;
}
.create-item {
    width: 100%;
}
</style>
