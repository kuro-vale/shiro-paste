<script setup>
import {onMounted, ref} from "vue";
import {ElContainer, ElHeader, ElMain, ElFooter, ElLoading, ElEmpty} from "element-plus";
import PasteCard from "@/components/PasteCard.vue";

onMounted(() => document.title = 'shiro-paste')

const API_URL = `${import.meta.env.VITE_API}/pastes`
const pastes = ref(null);

async function fetchData() {
  const loader = ElLoading.service()
  pastes.value = null
  const res = await fetch(API_URL)
  pastes.value = await res.json()
  loader.close()
}
fetchData()
</script>

<template>
  <el-container>
    <el-header><h1>Latest Pastes</h1></el-header>
    <el-main style="align-self: center">
      <PasteCard v-for="paste in pastes?.items" :key="paste.id" :paste="paste"></PasteCard>
      <el-empty :image-size="200" v-if="!(pastes?.items?.length > 0)" />
    </el-main>
    <el-footer>

    </el-footer>
  </el-container>
</template>

<style>

</style>