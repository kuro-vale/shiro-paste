<script setup>
import {ElEmpty} from "element-plus";
import logo from "../../assets/unauthorized.jpg";
import {useTitle} from "@vueuse/core";

useTitle("Unauthorized");
</script>

<template>
  <el-empty :image="logo" :image-size="300" description="You are not authorized to perform this action"></el-empty>
</template>

<style scoped>

</style>