<script setup>
import {onMounted, ref} from "vue";
import {
  ElContainer,
  ElEmpty,
  ElFooter,
  ElHeader,
  ElLoading,
  ElMain,
  ElButton,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem
} from "element-plus";
import {Plus} from "@element-plus/icons-vue";
import PasteCard from "@/components/PasteCard.vue";
import {API_URL, CREATE_ROUTE} from "@/constants";
import {redirectTo} from "@/utils";
import {useStore} from "vuex";
import UploadDialog from "@/components/UploadDialog.vue";

onMounted(() => document.title = "shiro-paste");

const URL = `${API_URL}/pastes`;
const pastes = ref(null);
const store = useStore();
const dialog = ref();

async function fetchData() {
  const loader = ElLoading.service();
  pastes.value = null;
  const res = await fetch(URL);
  if (res.status === 204) {
    loader.close();
    return;
  }
  pastes.value = await res.json();
  loader.close();
}

fetchData();
</script>

<template>
  <el-container>
    <el-header>
      <el-container style="justify-content: space-between">
        <h1>Latest Pastes</h1>
        <template v-if="store.state.currentUser">
          <el-dropdown trigger="click">
            <el-button
                :icon="Plus"
                circle
                class="centered"
                size="large"
                style="margin-right: 20px"
                type="success"
            />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="redirectTo(CREATE_ROUTE)">Create</el-dropdown-item>
                <el-dropdown-item @click="dialog.opened = true">Upload</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <UploadDialog ref="dialog"/>
        </template>
      </el-container>
    </el-header>
    <el-main class="centered">
      <PasteCard v-for="paste in pastes?.items" :key="paste.id" :paste="paste"></PasteCard>
      <el-empty v-if="!(pastes?.items?.length > 0)" :image-size="200"/>
    </el-main>
    <el-footer>

    </el-footer>
  </el-container>
</template>

<style>

</style>