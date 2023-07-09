<script setup>
import {RouterView} from "vue-router";
import {ElMenu, ElMenuItem, ElAvatar, ElText, ElSubMenu} from "element-plus";
import router from "@/router";
import {useStore} from "vuex";
import {onMounted} from "vue";
import {redirectTo} from "@/utils";

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
      <!--    Logged tabs    -->
      <template v-if="store.state.currentUser">
        <el-sub-menu>
          <template #title>
            <el-avatar :src="'https://robohash.org/' + store.state.currentUser.username + '?set=set4'"/>
            <el-text class="ml-10">{{ store.state.currentUser.username }}</el-text>
          </template>
          <el-menu-item>
            Profile
          </el-menu-item>
          <el-menu-item>
            Logout
          </el-menu-item>
        </el-sub-menu>
      </template>
      <!--   Anonymous tabs   -->
      <template v-else>
        <el-menu-item :index="router.getRoutes()[1].path" @click="redirectTo('/login')">
          Login
        </el-menu-item>
        <el-menu-item :index="router.getRoutes()[2].path" @click="redirectTo('/register')">
          Register
        </el-menu-item>
      </template>
    </el-menu>
  </nav>

  <RouterView/>
</template>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

.ml-10 {
  margin-left: 10px;
}
</style>
