<script setup>
import {onMounted, ref} from "vue";
import {ElContainer, ElEmpty, ElFooter, ElHeader, ElLoading, ElMain} from "element-plus";
import PasteCard from "@/components/PasteCard.vue";
import {API_URL} from "@/constants";

onMounted(() => document.title = "shiro-paste");

const URL = `${API_URL}/pastes`;
const pastes = ref(null);

async function fetchData() {
  const loader = ElLoading.service();
  pastes.value = null;
  const res = await fetch(URL);
  pastes.value = await res.json();
  loader.close();
}

fetchData();
</script>

<template>
  <el-container>
    <el-header><h1>Latest Pastes</h1></el-header>
    <el-main class="centered">
      <PasteCard v-for="paste in pastes?.items" :key="paste.id" :paste="paste"></PasteCard>
      <el-empty v-if="!(pastes?.items?.length > 0)" :image-size="200"/>
    </el-main>
    <el-footer>

    </el-footer>
  </el-container>
</template>

<style>

</style>