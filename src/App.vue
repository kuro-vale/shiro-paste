<script setup>
import {RouterView} from "vue-router";
import {ElMenu, ElMenuItem} from "element-plus";
import router from "@/router";
import {useStore} from "vuex";
import {onMounted} from "vue";

const redirectTo = (route) => {
  router.push(route);
};
const store = useStore();

onMounted(() => store.commit("setCurrentUser"));
</script>

<template>
  <nav>
    <el-menu
        :default-active="router.currentRoute.value.path"
        :ellipsis="false"
        mode="horizontal"
    >
      <el-menu-item :index="router.getRoutes()[0].path" @click="redirectTo('/')">
        Home
      </el-menu-item>
      <div class="flex-grow"/>
      <el-menu-item :index="router.getRoutes()[1].path" @click="redirectTo('/login')">
        Login
      </el-menu-item>
      <el-menu-item :index="router.getRoutes()[2].path" @click="redirectTo('/register')">
        Register
      </el-menu-item>
      <el-menu-item>
        {{ store.state.currentUser?.username }}
      </el-menu-item>
    </el-menu>
  </nav>

  <RouterView/>
</template>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>
