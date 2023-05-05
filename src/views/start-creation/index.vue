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
        <div v-for="(item, index) in modelParams" :key="index">
            <span class="demonstration">{{ item.nameZh }}</span>
            <el-slider v-model="bili" :max="20" />
            <component :is="`el-${item.controlType}`" v-model="bili" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { nsCommonLoginPost } from '@/services/common/login';
import creation from '@/constant/creation';

const bili = ref(1);
const modelParams = ref([]);
const getData = async () => {
    const res = await nsCommonLoginPost.request();
    if (res.code === 200) {
        console.log(res.data, creation); //jing-log
        modelParams.value = res.data.modelParams;
    }
};

onMounted(() => {
    getData();
});
</script>

<style lang="less" scoped></style>
