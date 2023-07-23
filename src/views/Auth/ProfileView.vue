<script setup>
import {onMounted, ref} from "vue";
import {API_URL, HOME_ROUTE, JWT_KEY, UNAUTHORIZED_ROUTE} from "@/constants";
import {redirectTo, triggerNotification} from "@/utils";
import {
  ElButton,
  ElContainer,
  ElDivider,
  ElHeader,
  ElImage,
  ElLoading,
  ElMain,
  ElMessageBox,
  ElSkeleton,
  ElSkeletonItem
} from "element-plus";
import {useStore} from "vuex";
import SocialsFooter from "@/components/SocialsFooter.vue";

onMounted(() => document.title = "Profile");

const URL = `${API_URL}/auth`;
const profile = ref(null);
const store = useStore();
const loading = ref(true);
const token = sessionStorage.getItem(JWT_KEY) || localStorage.getItem(JWT_KEY);

async function getProfile() {
  const response = await fetch(`${URL}/profile`, {
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

function deleteUser() {
  ElMessageBox.confirm(
      "You will lose all of your pastes",
      "Are your sure?",
      {
        confirmButtonText: "Continue",
        cancelButtonText: "Cancel",
        type: "warning",
      }
  ).then(async () => {
    const loader = ElLoading.service();
    const response = await fetch(URL, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    if (response.ok) {
      store.commit("logout");
      loader.close();
      redirectTo(HOME_ROUTE);
      triggerNotification("Success", "User deleted :(", "success");
    } else {
      const {message} = await response.json();
      loader.close();
      triggerNotification("Error", message, "error");
    }
  }).catch(() => null);
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
          <el-button type="danger" @click="deleteUser()">Delete user</el-button>
        </template>
      </el-skeleton>
    </el-main>
    <SocialsFooter/>
  </el-container>
</template>

<style scoped>
.profile {
  display: flex;
  flex-direction: column;
}
</style>