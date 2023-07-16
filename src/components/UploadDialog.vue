<script setup>
import {ElButton, ElDialog, ElUpload, ElIcon} from "element-plus";
import {ref} from "vue";
import {UploadFilled} from "@element-plus/icons-vue";
import {API_URL, JWT_KEY} from "@/constants";
import {triggerNotification} from "@/utils";

const opened = ref(false);
const uploadRef = ref();
const URL = `${API_URL}/pastes/upload`;
const token = sessionStorage.getItem(JWT_KEY) || localStorage.getItem(JWT_KEY);
const headers = {
  "Authorization": `Bearer ${token}`
};

defineExpose({
  opened
});

function submitUpload() {
  uploadRef.value.submit();
}

function onError(error, file) {
  const {message} = JSON.parse(error.message);
  triggerNotification(file.name, message, "error");
}
</script>

<template>
  <el-dialog v-model="opened" :close-on-click-modal="false" :destroy-on-close="true" title="Upload a new Paste">
    <el-upload
        ref="uploadRef"
        :action="URL"
        :auto-upload="false"
        :headers="headers"
        :limit="10"
        :on-error="onError"
        drag
        multiple
    >
      <el-icon class="el-icon--upload">
        <upload-filled/>
      </el-icon>
      <div class="el-upload__text">
        Drop files here or <em>click to upload</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          Only text files are allowed
        </div>
      </template>
    </el-upload>
    <template #footer>
      <el-button class="mr-10" @click="opened = false">Cancel</el-button>
      <el-button type="success" @click="submitUpload">Upload</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.mr-10 {
  margin-right: 10px;
}
</style>