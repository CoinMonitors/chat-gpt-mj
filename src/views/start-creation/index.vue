<template>
    <div class="start-creation"></div>
</template>

<script setup lang="ts">
import { nsCommonLoginPost } from '@/services/common/login';

const getData = async () => {
    const res = await nsCommonLoginPost.request();
    if (res.code === 200) {
        console.log(res.data); //jing-log
    }
};

onMounted(() => {
    getData();
});
</script>

<style lang="less" scoped></style>
