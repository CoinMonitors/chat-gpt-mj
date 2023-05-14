<!--
 * @Author: zch1999 1901394767@qq.com
 * @Date: 2023-05-04 17:52:03
 * @LastEditors: zch1999 1901394767@qq.com
 * @LastEditTime: 2023-05-14 19:24:51
 * @FilePath: /chat-gpt-mj/src/views/start-creation/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="create">
        <CreateForm class="left" :changeTaskId="changeTaskId" />
        <CreateResult class="right" :taskId="taskId" v-if="taskId" />
    </div>
</template>

<script setup lang="ts">
import CreateForm from './createForm.vue';
import CreateResult from './createResult.vue';

const taskId = ref<string>('');
const changeTaskId = (value: string) => {
    taskId.value = value;
};
</script>

<style scoped lang="less">
.create {
    display: flex;
    height: 100%;
    padding: 40px;
    background-color: #363634;
    .left {
        width: 60%;
    }
    .right {
        width: 40%;
    }
}
</style>
