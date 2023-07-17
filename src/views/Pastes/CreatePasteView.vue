<script setup>
import {ElContainer, ElHeader, ElMain} from "element-plus";
import SocialsFooter from "@/components/SocialsFooter.vue";
import PasteEditor from "@/components/PasteEditor.vue";
import {onMounted, ref} from "vue";
import {API_URL, JWT_KEY, SHOW_PASTE_ROUTE} from "@/constants";
import {redirectTo, triggerNotification} from "@/utils";

onMounted(() => document.title = "shiro-paste");

const URL = `${API_URL}/pastes/compose`;
const formRef = ref();
const token = sessionStorage.getItem(JWT_KEY) || localStorage.getItem(JWT_KEY);

async function createPaste(request) {
  const response = await fetch(URL, {
    method: "POST",
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
  const {id} = await response.json();
  triggerNotification("Success", "Paste created successfully", "success");
  redirectTo(SHOW_PASTE_ROUTE.replace(":id", id));
}
</script>

<template>
  <el-container>
    <el-header><h1>Create a new paste</h1></el-header>
    <el-main class="centered">
      <PasteEditor ref="formRef" @submit="args => createPaste(args)">Create</PasteEditor>
    </el-main>
    <SocialsFooter/>
  </el-container>
</template>

<style scoped>

</style>