<script setup>
import {onMounted, ref} from "vue";
import {API_URL, JWT_KEY, UNAUTHORIZED_ROUTE} from "@/constants";
import {redirectTo} from "@/utils";
import {ElLoading} from "element-plus";
import {useStore} from "vuex";

onMounted(() => document.title = "Profile");

const URL = `${API_URL}/auth/profile`;
const profile = ref(null);
const store = useStore();

async function getProfile() {
  const loader = ElLoading.service();
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
  loader.close();
}

getProfile();
</script>

<template>
  <h1>{{ profile?.username }}</h1>
</template>

<style scoped>

</style>