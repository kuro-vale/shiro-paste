<script setup>
import {ElContainer, ElHeader, ElMain} from "element-plus";
import {onMounted} from "vue";
import UserForm from "@/components/UserForm.vue";
import SocialsFooter from "@/components/SocialsFooter.vue";

onMounted(() => document.title = 'Login')
</script>

<template>
  <el-container>
    <el-header class="centered"><h1>Login</h1></el-header>
    <el-main class="centered">
      <UserForm :with-confirmation="false"></UserForm>
    </el-main>
    <SocialsFooter></SocialsFooter>
  </el-container>
</template>

<style scoped>

</style>