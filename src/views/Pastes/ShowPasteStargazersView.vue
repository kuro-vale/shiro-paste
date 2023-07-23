<script setup>
import {useRoute} from "vue-router";
import {API_URL, USER_PASTES_ROUTE} from "@/constants";
import {ElCard, ElCol, ElContainer, ElEmpty, ElHeader, ElLink, ElLoading, ElMain, ElRow} from "element-plus";
import {ref} from "vue";
import {redirectTo} from "@/utils";

const route = useRoute();
const pasteId = route.params.id;
const URL = `${API_URL}/stars/${pasteId}`;
const users = ref(null);

async function fetchData() {
  const loader = ElLoading.service();
  const response = await fetch(URL);
  if (response.ok && response.status !== 204) {
    users.value = await response.json();
  }
  loader.close();
}

fetchData();
</script>

<template>
  <el-container>
    <el-header><h1>Stargazers</h1></el-header>
    <el-main>
      <el-row :gutter="20">
        <el-col v-for="user in users" :key="user['id']" :span="6">
          <el-card style="margin-bottom: 25px">
            <img :src="'https://robohash.org/' + user['username'] + '?set=set4'" alt="profile-photo" class="image"/>
            <el-link
                :underline="false"
                style="display: flex; justify-content: center; margin-top: 15px"
                type="primary"
                @click="redirectTo(USER_PASTES_ROUTE.replace(':id', user['id']))"
            >
              {{ user["username"] }}
            </el-link>
          </el-card>
        </el-col>
      </el-row>
      <el-empty v-if="!(users?.length > 0)" :image-size="200"/>
    </el-main>
  </el-container>
</template>

<style scoped>
.image {
  width: 100%;
  display: block;
}
</style>