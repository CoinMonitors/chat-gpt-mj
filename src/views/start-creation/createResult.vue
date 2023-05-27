<!--
 * @Author: zch1999 1901394767@qq.com
 * @Date: 2023-05-09 12:45:24
 * @LastEditors: zch1999 1901394767@qq.com
 * @LastEditTime: 2023-05-14 20:26:39
 * @FilePath: /chat-gpt-mj/src/views/start-creation/createResult.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="result">
        <div v-if="!imgList.length">{{ taskId }}<br />图片生成中...</div>
        <img v-for="(item, index) in imgList" :key="index" :src="item" alt="" />
    </div>
</template>

<script setup lang="ts">
import { nsCommonModelPost } from '@/services/common/login';

const props = defineProps({
    taskId: String
});
const imgList = ref<Array<string>>([]);
watchEffect(() => {
    // console.log(newTaskId, oldData, '111');
    if (!props.taskId) return;
    let timer = setInterval(async () => {
        const res = await nsCommonModelPost.getDrawResult(props.taskId);
        console.log(res);
        if (res.data.imgList && res.data.imgList.length > 0) {
            imgList.value = res.data.imgList;
            clearInterval(timer);
        }
    }, 10000);
});
</script>

<style scoped lang="less">
.result {
    padding-left: 50px;
    padding-top: 50px;
}
</style>
