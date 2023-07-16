<script setup>
import {onMounted, ref} from "vue";
import {ElContainer, ElMain} from "element-plus";
import {API_URL, NOT_FOUND_ROUTE} from "@/constants";
import {ElLoading} from "element-plus";
import {useRoute} from "vue-router";
import PasteCard from "@/components/PasteCard.vue";
import {redirectTo} from "@/utils";

onMounted(() => document.title = "shiro-paste");

const route = useRoute();
const pasteId = route.params.id;
const URL = `${API_URL}/pastes/${pasteId}`;
const paste = ref(null);

async function fetchPaste() {
  const loader = ElLoading.service();
  const response = await fetch(URL);
  loader.close();
  if (!response.ok) {
    redirectTo(NOT_FOUND_ROUTE);
    return;
  }
  paste.value = await response.json();
}

fetchPaste();
</script>

<template>
  <el-container>
    <el-main class="full-card">
      <PasteCard v-if="paste" :paste="paste" :preview="false" style="width: 90vw;"/>
    </el-main>
  </el-container>
</template>

<style scoped>
.full-card {
  display: flex;
  justify-content: center;
}
</style>