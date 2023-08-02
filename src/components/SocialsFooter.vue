<script setup>
import {ElFooter, ElLink} from "element-plus";
</script>

<template>
  <el-footer class="bottom-footer">
    <el-link href="https://github.com/kuro-vale/shiro-paste" target="_blank" :underline="false">Github</el-link>
    <el-link href="https://x.com/kuro-vale/" target="_blank" type="info" :underline="false">X</el-link>
    <el-link href="https://www.linkedin.com/in/kurovale/" target="_blank" type="primary" :underline="false">LinkedIn</el-link>
    <el-link href="https://x.com/_Silvervale_" target="_blank" type="success" :underline="false">Best Girl ❤️</el-link>
  </el-footer>
</template>

<style scoped>
@media (min-height: 700px) {
  .bottom-footer {
    bottom: 0;
    position: absolute;
  }
}

.bottom-footer {
  display: flex;
  justify-content: space-evenly;
  width: 95%;
}
</style>