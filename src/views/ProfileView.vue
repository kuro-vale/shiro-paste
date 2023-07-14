<script setup>
import {onMounted, ref} from "vue";
import {API_URL, JWT_KEY, UNAUTHORIZED_ROUTE} from "@/constants";
import {redirectTo} from "@/utils";
import {ElButton, ElContainer, ElHeader, ElMain, ElImage, ElDivider, ElSkeleton, ElSkeletonItem} from "element-plus";
import {useStore} from "vuex";
import SocialsFooter from "@/components/SocialsFooter.vue";

onMounted(() => document.title = "Profile");

const URL = `${API_URL}/auth/profile`;
const profile = ref(null);
const store = useStore();
const loading = ref(true);

async function getProfile() {
  const token = sessionStorage.getItem(JWT_KEY) || localStorage.getItem(JWT_KEY);
  const response = await fetch(URL, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (!response.ok) {
    store.commit("logout");
    redirectTo(UNAUTHORIZED_ROUTE);
  }
  profile.value = await response.json();
  loading.value = false;
}

getProfile();
</script>

<template>
  <el-container>
    <el-header class="centered"><h1>{{ profile?.username }}</h1></el-header>
    <el-main class="centered profile">
      <el-skeleton :loading="loading" animated style="width: 40vh">
        <template #template>
          <el-skeleton-item style="width: 100%; height: 40vh" variant="image"></el-skeleton-item>
        </template>
        <template #default>
          <el-image :src="'https://robohash.org/' + profile.username + '?set=set4'" style="width: 40vh"></el-image>
          <el-divider></el-divider>
          <el-button type="danger">Delete user</el-button>
        </template>
      </el-skeleton>
    </el-main>
    <SocialsFooter></SocialsFooter>
  </el-container>
</template>

<style scoped>
.profile {
  display: flex;
  flex-direction: column;
}
</style>