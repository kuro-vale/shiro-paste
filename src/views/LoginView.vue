<script setup>
import {ElContainer, ElHeader, ElMain} from "element-plus";
import {onMounted, ref} from "vue";
import UserForm from "@/components/UserForm.vue";
import SocialsFooter from "@/components/SocialsFooter.vue";
import {API_URL, JWT_KEY, PROFILE_ROUTE} from "@/constants";
import {redirectTo, triggerNotification} from "@/utils";
import {useStore} from "vuex";

onMounted(() => document.title = "Login");

const URL = `${API_URL}/auth/login`;
const formRef = ref();
const store = useStore();

async function login(request) {
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  if (!response.ok) {
    formRef.value.loading = false;
    triggerNotification("", "Invalid credentials", "error");
    return;
  }
  triggerNotification("Success", "Logged successfully", "success");
  const {token} = await response.json();
  if (request.stayLogged) {
    localStorage.setItem(JWT_KEY, token);
  } else {
    sessionStorage.setItem(JWT_KEY, token);
  }
  store.commit("setCurrentUser");
  redirectTo(PROFILE_ROUTE);
}
</script>

<template>
  <el-container>
    <el-header class="centered"><h1>Login</h1></el-header>
    <el-main class="centered">
      <UserForm ref="formRef" :with-confirmation="false" @submit="(d) => login(d)">Login</UserForm>
    </el-main>
    <SocialsFooter></SocialsFooter>
  </el-container>
</template>

<style scoped>

</style>