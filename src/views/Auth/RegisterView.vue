<script setup>
import {ref} from "vue";
import {ElContainer, ElHeader, ElMain} from "element-plus";
import UserForm from "@/components/UserForm.vue";
import SocialsFooter from "@/components/SocialsFooter.vue";
import {API_URL, JWT_KEY, PROFILE_ROUTE} from "@/constants";
import {useStore} from "vuex";
import {redirectTo, triggerNotification} from "@/utils";
import {useTitle} from "@vueuse/core";

useTitle("Register");
const URL = `${API_URL}/auth/register`;
const formRef = ref();
const store = useStore();

async function register(request) {
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  if (!response.ok) {
    formRef.value.loading = false;
    const {message} = await response.json();
    triggerNotification("", message, "error");
    return;
  }
  const {token, username} = await response.json();
  triggerNotification("Welcome!", `"${username}" successfully registered`, "success");
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
    <el-header class="centered"><h1>Register</h1></el-header>
    <el-main class="centered">
      <UserForm ref="formRef" :with-confirmation="true" @submit="(d) => register(d)">Register</UserForm>
    </el-main>
    <SocialsFooter/>
  </el-container>
</template>

<style scoped>

</style>