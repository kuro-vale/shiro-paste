<script setup>
import {RouterView} from 'vue-router'
import {ElMenu, ElMenuItem} from 'element-plus'
import router from "@/router";

const redirectTo = (route) => {
  router.push(route);
}
</script>

<template>
  <header>
    <el-menu
        :default-active="router.currentRoute.value.path"
        mode="horizontal"
        :ellipsis="false"
    >
      <el-menu-item :index="router.getRoutes()[0].path" @click="redirectTo('/')">
        Home
      </el-menu-item>
      <div class="flex-grow"/>
      <el-menu-item :index="router.getRoutes()[1].path" @click="redirectTo('/login')">
        Sign in
      </el-menu-item>
      <el-menu-item :index="router.getRoutes()[2].path" @click="redirectTo('/register')">
        Sign up
      </el-menu-item>
    </el-menu>
  </header>

  <RouterView/>
</template>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>
