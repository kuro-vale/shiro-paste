<!--suppress ES6UnusedImports -->
<script setup>
import {ElButton, ElContainer} from "element-plus";
import CodeEditor from "simple-code-editor";
// eslint-disable-next-line no-unused-vars
import hljs from "highlight.js";
import {reactive} from "vue";

const pasteForm = reactive({
  body: "",
  filename: "",
  extension: ""
});
</script>

<template>
  <CodeEditor
      v-model="pasteForm.body"
      :autofocus="true"
      :line-nums="true"
      height="55vh"
      theme="github"
      width="75vw"
  />
  <el-container class="code-actions">
    <el-button type="success">
      <slot/>
    </el-button>
  </el-container>
</template>

<style scoped>
.code-actions {
  justify-content: end;
  margin-top: 10px;
}
</style>