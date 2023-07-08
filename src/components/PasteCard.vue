<script setup>
import {ElAvatar, ElBreadcrumb, ElBreadcrumbItem, ElCard} from 'element-plus';
import {ArrowRight} from '@element-plus/icons-vue';
import CodeEditor from 'simple-code-editor';
import hljs from 'highlight.js';

defineProps({
  paste: Object
});

function setLanguage() {
  // todo
  return [['text']];
}
</script>

<template>
  <el-card class="card">
    <template #header>
      <div class="card-header">
        <el-avatar :src="'https://robohash.org/' + paste['created_by']['username']+ '?set=set4'"></el-avatar>
        <el-breadcrumb :separator-icon="ArrowRight" class="card-breadcrumb">
          <el-breadcrumb-item>{{ paste['created_by']['username'] }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ paste['filename'] }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </template>
    <CodeEditor :languages="setLanguage()"
                :line-nums="true"
                :read-only="true"
                :value="paste['body']"
                border-radius="0"
                theme="github"
                max-height="280px"
                width="75vw"
    ></CodeEditor>
  </el-card>
</template>

<style scoped>
.card {
  margin-bottom: 30px;
}

.card-header {
  display: flex;
  align-items: center;
}

.card-breadcrumb {
  margin-left: 15px;
}
</style>