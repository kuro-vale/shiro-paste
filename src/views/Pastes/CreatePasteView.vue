<script setup>
import {ElContainer, ElHeader, ElMain} from "element-plus";
import SocialsFooter from "@/components/SocialsFooter.vue";
import PasteEditor from "@/components/PasteEditor.vue";
</script>

<template>
<el-container>
  <el-header><h1>Create a new paste</h1></el-header>
  <el-main class="centered">
    <PasteEditor>Create</PasteEditor>
  </el-main>
  <SocialsFooter/>
</el-container>
</template>

<style scoped>

</style>