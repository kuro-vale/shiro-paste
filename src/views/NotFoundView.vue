<script setup>
import {ElEmpty} from "element-plus";
import {useTitle} from "@vueuse/core";

useTitle("404");
</script>

<template>
  <el-empty :image-size="300" description="404: Not found"></el-empty>
</template>

<style scoped>

</style>