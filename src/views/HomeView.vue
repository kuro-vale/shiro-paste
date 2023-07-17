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
  ElDropdownItem,
  ElPagination, ElOption, ElInput, ElSelect
} from "element-plus";
import {Plus, Search} from "@element-plus/icons-vue";
import PasteCard from "@/components/PasteCard.vue";
import {API_URL, CREATE_ROUTE} from "@/constants";
import {redirectTo} from "@/utils";
import {useStore} from "vuex";
import UploadDialog from "@/components/UploadDialog.vue";

onMounted(() => document.title = "shiro-paste");

const URL = `${API_URL}/pastes`;
const pastes = ref(null);
const store = useStore();
const uploadDialogRef = ref();
const openUploadDialog = () => uploadDialogRef.value.opened = true;
const currentPage = ref(1);
const select = ref("body");
const inputSearch = ref("");
let query = "";

async function fetchData() {
  const loader = ElLoading.service();
  pastes.value = null;
  const res = await fetch(`${URL}?page=${currentPage.value}${query}`);
  if (res.status === 204) {
    loader.close();
    return;
  }
  pastes.value = await res.json();
  loader.close();
}

function searchPaste() {
  currentPage.value = 1;
  query = inputSearch.value !== "" ? `&${select.value}=${inputSearch.value}` : "";
  fetchData();
}

fetchData();
</script>

<template>
  <el-container>
    <el-header>
      <el-container style="justify-content: space-between">
        <h1>All Pastes</h1>
        <div class="centered small-screens">
          <el-input
              v-model="inputSearch"
              placeholder="Search by"
              @keydown.enter="searchPaste"
          >
            <template #prepend>
              <el-button :icon="Search"/>
            </template>
            <template #append>
              <el-select v-model="select" placeholder="Select" style="width: 115px;">
                <el-option label="File body" value="body"/>
                <el-option label="Filename" value="filename"/>
                <el-option label="Extension" value="extension"/>
              </el-select>
            </template>
          </el-input>
        </div>
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
                <el-dropdown-item @click="redirectTo(CREATE_ROUTE)">Create paste</el-dropdown-item>
                <el-dropdown-item @click="openUploadDialog">Upload pastes</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <UploadDialog ref="uploadDialogRef"/>
        </template>
      </el-container>
    </el-header>
    <el-main class="centered">
      <PasteCard
          v-for="paste in pastes?.items"
          :key="paste.id"
          :paste="paste"
          :preview="true"
          style="width: 75vw"
      />
      <el-empty v-if="!(pastes?.items?.length > 0)" :image-size="200"/>
    </el-main>
    <el-footer class="centered">
      <el-pagination
          v-if="pastes?.metadata"
          v-model:current-page="currentPage"
          :background="true"
          :hide-on-single-page="true"
          :page-size="pastes.metadata['per']"
          :small="true"
          :total="pastes.metadata['count']"
          layout="prev, pager, next"
          @current-change="fetchData"
      />
    </el-footer>
  </el-container>
</template>

<style>
@media (max-width: 500px) {
  .small-screens {
    display: none;
  }
}
</style>