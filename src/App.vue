<script setup>
import {RouterView, useRoute} from "vue-router";
import {ElAvatar, ElMenu, ElMenuItem, ElSubMenu, ElText} from "element-plus";
import {useStore} from "vuex";
import {onMounted} from "vue";
import {redirectTo, triggerNotification} from "@/utils";
import {HOME_ROUTE, LOGIN_ROUTE, MY_PASTES_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE} from "@/constants";

const route = useRoute();
const store = useStore();

onMounted(() => store.commit("setCurrentUser"));

function logout() {
  store.commit("logout");
  triggerNotification("See you again", "Successfully logout", "info");
  redirectTo(LOGIN_ROUTE);
}
</script>

<template>
  <nav>
    <el-menu
        :default-active="route.path"
        :ellipsis="false"
        menu-trigger="click"
        mode="horizontal"
    >
      <el-menu-item :index="HOME_ROUTE" @click="e => redirectTo(e.index)">
        Home
      </el-menu-item>
      <div class="flex-grow"/>
      <!--    Logged tabs    -->
      <template v-if="store.state.currentUser">
        <el-sub-menu index="user">
          <template #title>
            <el-avatar :src="'https://robohash.org/' + store.state.currentUser.username + '?set=set4'"
                       alt="profile-photo"/>
            <el-text class="ml-10">{{ store.state.currentUser.username }}</el-text>
          </template>
          <el-menu-item :index="PROFILE_ROUTE" @click="e => redirectTo(e.index)">
            Profile
          </el-menu-item>
          <el-menu-item :index="MY_PASTES_ROUTE" @click="e => redirectTo(e.index)">
            My pastes
          </el-menu-item>
          <el-menu-item index="logout" @click="logout()">
            Logout
          </el-menu-item>
        </el-sub-menu>
      </template>
      <!--   Anonymous tabs   -->
      <template v-else>
        <el-menu-item :index="LOGIN_ROUTE" @click="e => redirectTo(e.index)">
          Login
        </el-menu-item>
        <el-menu-item :index="REGISTER_ROUTE" @click="e => redirectTo(e.index)">
          Register
        </el-menu-item>
      </template>
    </el-menu>
  </nav>

  <RouterView/>
</template>

<style scoped>
.ml-10 {
  margin-left: 10px;
}
</style>
