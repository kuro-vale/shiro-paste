<script setup>
import {onMounted} from 'vue';
import {ElContainer, ElHeader, ElMain} from 'element-plus';
import UserForm from '@/components/UserForm.vue';
import SocialsFooter from '@/components/SocialsFooter.vue';

onMounted(() => document.title = 'Register');
</script>

<template>
  <el-container>
    <el-header class="centered"><h1>Register</h1></el-header>
    <el-main class="centered">
      <UserForm :with-confirmation="true">Register</UserForm>
    </el-main>
    <SocialsFooter></SocialsFooter>
  </el-container>
</template>

<style scoped>

</style>