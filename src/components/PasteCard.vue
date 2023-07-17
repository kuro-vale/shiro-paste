<!--suppress ES6UnusedImports -->
<script setup>
import {ElAvatar, ElBreadcrumb, ElBreadcrumbItem, ElCard, ElLink, ElLoading, ElMessageBox} from "element-plus";
import {ArrowRight} from "@element-plus/icons-vue";
import CodeEditor from "simple-code-editor";
// eslint-disable-next-line no-unused-vars
import hljs from "highlight.js";
import {redirectTo} from "@/utils";
import {API_URL, EDIT_PASTE_ROUTE, HOME_ROUTE, JWT_KEY, SHOW_PASTE_ROUTE} from "@/constants";
import {Edit, Delete} from "@element-plus/icons-vue";
import {useStore} from "vuex";
import {ref} from "vue";

const store = useStore();
const URL = `${API_URL}/pastes`;
const isDeleted = ref(false);
const token = sessionStorage.getItem(JWT_KEY) || localStorage.getItem(JWT_KEY);

const props = defineProps({
  paste: Object,
  preview: Boolean
});

function deletePaste() {
  ElMessageBox.confirm(
      "This paste will be permanently deleted",
      "Are you sure?",
      {
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        type: "warning",
      }
  ).then(async () => {
    const loader = ElLoading.service();
    isDeleted.value = true;
    await fetch(`${URL}/${props.paste.id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      },
    });
    loader.close();
    redirectTo(HOME_ROUTE);
  });
}

function setLanguage() {
  // todo
  return [["text"]];
}
</script>

<template>
  <el-card v-if="!isDeleted" :class="preview && 'code-link'" class="card">
    <template #header>
      <div class="card-header">
        <el-avatar :src="'https://robohash.org/' + paste['created_by']['username'] + '?set=set4'"></el-avatar>
        <el-breadcrumb :separator-icon="ArrowRight" class="ml-15">
          <el-breadcrumb-item>{{ paste["created_by"]["username"] }}</el-breadcrumb-item>
          <el-breadcrumb-item :to="{name: 'show', params: {id: paste['id']}}">{{
              paste["filename"]
            }}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="flex-grow"/>
        <div v-if="store.state.currentUser?.sub === paste['created_by']['id']">
          <el-link
              :icon="Edit"
              type="primary"
              @click="redirectTo(EDIT_PASTE_ROUTE.replace(':id', paste['id']))">
            Edit
          </el-link>
          <el-link :icon="Delete" class="ml-15" type="danger" @click="deletePaste">Delete</el-link>
        </div>
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

.ml-15 {
  margin-left: 15px;
}

/*noinspection CssUnusedSymbol*/
.code-link:hover {
  border: var(--el-color-primary) solid 1px;
}
</style>