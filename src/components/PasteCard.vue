<!--suppress ES6UnusedImports -->
<script setup>
import {ElAvatar, ElBreadcrumb, ElBreadcrumbItem, ElCard} from "element-plus";
import {ArrowRight} from "@element-plus/icons-vue";
import CodeEditor from "simple-code-editor";
// eslint-disable-next-line no-unused-vars
import hljs from "highlight.js";
import {redirectTo} from "@/utils";
import {SHOW_PASTE_ROUTE} from "@/constants";

defineProps({
  paste: Object,
  preview: Boolean
});

function setLanguage() {
  // todo
  return [["text"]];
}
</script>

<template>
  <el-card :class="preview && 'code-link'" class="card">
    <template #header>
      <div class="card-header">
        <el-avatar :src="'https://robohash.org/' + paste['created_by']['username'] + '?set=set4'"></el-avatar>
        <el-breadcrumb :separator-icon="ArrowRight" class="card-breadcrumb">
          <el-breadcrumb-item>{{ paste["created_by"]["username"] }}</el-breadcrumb-item>
          <el-breadcrumb-item :to="{name: 'show', params: {id: paste['id']}}">{{
              paste["filename"]
            }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </template>
    <CodeEditor
        :copy-code="!preview"
        :languages="setLanguage()"
        :line-nums="true"
        :max-height="preview ? '280px' : ''"
        :read-only="true"
        :value="paste['body']"
        border-radius="0"
        theme="github"
        width="100%"
        @click="preview && redirectTo(SHOW_PASTE_ROUTE.replace(':id', paste['id']))"
    ></CodeEditor>
  </el-card>
</template>

<style scoped>
.card {
  margin-bottom: 50px;
}

.card-header {
  display: flex;
  align-items: center;
}

.card-breadcrumb {
  margin-left: 15px;
}

/*noinspection CssUnusedSymbol*/
.code-link:hover {
  border: var(--el-color-primary) solid 1px;
}
</style>