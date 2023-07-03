<script setup>
import {RouterView} from 'vue-router'
import {ElMenu, ElMenuItem} from 'element-plus'
import {ref} from "vue";
import router from "@/router";

const activeIndex = ref('1')

const redirectTo = (route) => {
  router.push(route);
}
</script>

<template>
  <header>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
    >
      <el-menu-item index="0" @click="redirectTo('/')">
        Home
      </el-menu-item>
      <div class="flex-grow"/>
      <el-menu-item index="1" @click="redirectTo('/about')">
        About
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
