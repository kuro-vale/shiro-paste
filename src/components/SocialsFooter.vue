<script setup>
import {ElFooter, ElLink} from "element-plus";
</script>

<template>
  <el-footer class="bottom-footer">
    <el-link :underline="false" href="https://github.com/kuro-vale/shiro-paste" target="_blank">Github</el-link>
    <el-link :underline="false" href="https://x.com/kuro-vale/" target="_blank" type="info">X</el-link>
    <el-link :underline="false" href="https://www.linkedin.com/in/kurovale/" target="_blank" type="primary">
      LinkedIn
    </el-link>
    <el-link :underline="false" href="https://x.com/_Silvervale_" target="_blank" type="success">Best Girl ❤️</el-link>
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