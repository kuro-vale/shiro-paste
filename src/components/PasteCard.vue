<script setup>
import {ElCard, ElAvatar, ElBreadcrumb, ElBreadcrumbItem} from "element-plus";
import {ArrowRight} from '@element-plus/icons-vue'

defineProps({
  paste: Object
});
</script>

<template>
  <el-card class="card">
    <template #header>
      <div class="card-header">
        <el-avatar :src="'https://robohash.org/' + paste.created_by.username + '?set=set4'"></el-avatar>
        <el-breadcrumb :separator-icon="ArrowRight" class="card-breadcrumb">
          <el-breadcrumb-item>{{ paste.created_by.username }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ paste.filename }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </template>
    <highlightjs languague="python" :code="paste.body" class="code"></highlightjs>
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