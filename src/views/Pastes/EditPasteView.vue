<script setup>
import {ElContainer, ElHeader, ElLoading, ElMain} from "element-plus";
import PasteEditor from "@/components/PasteEditor.vue";
import {ref} from "vue";
import {redirectTo, triggerNotification} from "@/utils";
import {API_URL, JWT_KEY, NOT_FOUND_ROUTE, SHOW_PASTE_ROUTE, UNAUTHORIZED_ROUTE} from "@/constants";
import {useRoute} from "vue-router";
import {useStore} from "vuex";

const formRef = ref();
const store = useStore();
const route = useRoute();
const pasteId = route.params.id;
const URL = `${API_URL}/pastes/${pasteId}`;
const paste = ref(null);
const token = sessionStorage.getItem(JWT_KEY) || localStorage.getItem(JWT_KEY);

async function editPaste(request) {
  const response = await fetch(URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(request),
  });
  if (!response.ok) {
    const {message} = await response.json();
    formRef.value.loading = false;
    triggerNotification("Error", message, "error");
    return;
  }
  triggerNotification("Success", "Paste edited", "success");
  redirectTo(SHOW_PASTE_ROUTE.replace(":id", pasteId));
}

async function fetchPaste() {
  const loader = ElLoading.service();
  const response = await fetch(URL);
  loader.close();
  if (!response.ok) {
    redirectTo(NOT_FOUND_ROUTE);
    return;
  }
  paste.value = await response.json();
  if (paste.value["created_by"]["id"] !== store.state.currentUser.sub) {
    redirectTo(UNAUTHORIZED_ROUTE);
  }
}

fetchPaste();
</script>

<template>
  <el-container>
    <el-header><h1>Edit paste</h1></el-header>
    <el-main class="centered">
      <PasteEditor v-if="paste" ref="formRef" :paste="paste" @submit="args => editPaste(args)">Edit</PasteEditor>
    </el-main>
  </el-container>
</template>

<style scoped>

</style>