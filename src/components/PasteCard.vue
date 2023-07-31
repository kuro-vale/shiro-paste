<!--suppress ES6UnusedImports -->
<script setup>
import {
  ElAvatar,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElButton,
  ElCard,
  ElLink,
  ElLoading,
  ElMessageBox,
  ElPopover
} from "element-plus";
import CodeEditor from "simple-code-editor";
// eslint-disable-next-line no-unused-vars
import hljs from "highlight.js";
import {getTheme, redirectTo, triggerNotification} from "@/utils";
import {
  API_URL,
  EDIT_PASTE_ROUTE,
  HOME_ROUTE,
  JWT_KEY,
  LANG_EXTENSIONS,
  LANG_LIST,
  SHOW_PASTE_ROUTE,
  STARGAZERS_ROUTE
} from "@/constants";
import {ArrowRight, Delete, Edit, Star} from "@element-plus/icons-vue";
import {useStore} from "vuex";
import {ref} from "vue";

const store = useStore();
const URL = `${API_URL}/pastes`;
const STAR_URL = `${API_URL}/stars`;
const isDeleted = ref(false);
const visible = ref(false);
const starGiven = ref(0);
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

async function giveAStar() {
  visible.value = false;
  const response = await fetch(`${STAR_URL}/${props.paste.id}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    },
  });
  if (!response.ok) {
    const {message} = await response.json();
    triggerNotification("Error", message, "error");
  } else {
    starGiven.value = 1;
  }
}

async function removeStar() {
  visible.value = false;
  const response = await fetch(`${STAR_URL}/${props.paste.id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    },
  });
  if (!response.ok) {
    const {message} = await response.json();
    triggerNotification("Error", message, "error");
  } else {
    starGiven.value -= 1;
  }
}

function setLanguage() {
  return [LANG_LIST.find(x => x[0] === LANG_EXTENSIONS[props.paste.extension.toLowerCase()]) || ["plaintext", "Text"]];
}
</script>

<template>
  <el-card v-if="!isDeleted" :class="preview && 'code-link'" class="card">
    <template #header>
      <div class="card-header">
        <el-avatar :src="'https://robohash.org/' + paste['created_by']['username'] + '?set=set4'"
                   class="small-screens"/>
        <el-breadcrumb :separator-icon="ArrowRight" class="ml-15">
          <el-breadcrumb-item :to="{name: 'user pastes', params: {id: paste['created_by']['id']}}">
            {{ paste["created_by"]["username"] }}
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{name: 'show', params: {id: paste['id']}}">{{
              paste["filename"] + paste["extension"]
            }}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="flex-grow"/>
        <el-popover :visible="visible" placement="top">
          <template #reference>
            <el-button :icon="Star" size="small" type="warning" @click="visible = !visible">
              {{ paste["stars"] + starGiven }}
            </el-button>
          </template>
          <el-link type="primary" @click="redirectTo(STARGAZERS_ROUTE.replace(':id', paste['id']))">
            Show stargazers
          </el-link>
          <div v-if="store.state.currentUser">
            <el-link type="success" @click="giveAStar">Give a star</el-link>
            <el-link type="danger" @click="removeStar">Remove star</el-link>
          </div>
        </el-popover>
        <div v-if="store.state.currentUser?.sub === paste['created_by']['id']">
          <el-link
              :icon="Edit"
              class="ml-15"
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
        :theme="getTheme()"
        :value="paste['body']"
        border-radius="0"
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