<script setup>
import {ElButton, ElCheckbox, ElForm, ElFormItem, ElInput} from "element-plus";
import {reactive} from "vue";

defineProps({
  withConfirmation: Boolean
})

const formLogin = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  stayLogged: false,
})
</script>

<template>
  <el-form
      :model="formLogin"
      class="form"
      label-position="top"
  >
    <el-form-item label="Username">
      <el-input v-model="formLogin.username"></el-input>
    </el-form-item>
    <el-form-item label="Password">
      <el-input
          v-model="formLogin.password"
          show-password
          type="password"
      ></el-input>
    </el-form-item>
    <el-form-item v-if="withConfirmation" label="Confirm password">
      <el-input
          v-model="formLogin.confirmPassword"
          show-password
          type="password"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-checkbox v-model="formLogin.stayLogged" label="Stay logged"></el-checkbox>
    </el-form-item>
    <el-button :loading="false" style="width: 100%" type="primary">Login</el-button>
  </el-form>
</template>

<style scoped>
.form {
  width: 60vw;
  max-width: 600px;
}
</style>