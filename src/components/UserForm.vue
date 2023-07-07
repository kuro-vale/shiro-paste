<script setup>
import {ElButton, ElCheckbox, ElForm, ElFormItem, ElInput} from "element-plus";
import {reactive, ref} from "vue";

const props = defineProps({
  withConfirmation: Boolean
})

const emit = defineEmits(['submit'])

const loading = ref(false)

defineExpose({
  loading
})

const userForm = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  stayLogged: false,
})

const userFormRef = ref()

const validatePassword = (rule, value, callback) => {
  if (!props.withConfirmation) callback()
  if (userForm.confirmPassword !== '') {
    userFormRef.value.validateField('confirmPassword', () => null)
  }
  callback()
}
const validateConfirmPassword = (rule, value, callback) => {
  if (value !== userForm.password) {
    callback('Password confirmation doesn\'t match')
  }
  callback()
}

const rules = reactive({
  username: [
    {required: true, trigger: 'blur', message: 'Please input the username'},
    {whitespace: true, trigger: 'blur', message: 'Username cannot be empty'},
    {min: 2, trigger: 'blur', message: 'Username must have at least 2 characters'}
  ],
  password: [
    {required: true, trigger: 'blur', message: 'Please input the password'},
    {min: 2, trigger: 'blur', message: 'Password must have at least 2 characters'},
    {validator: validatePassword, trigger: 'blur'}
  ],
  confirmPassword: [
    {required: true, trigger: 'blur', message: 'Please input the password again'},
    {validator: validateConfirmPassword, trigger: 'blur'}
  ]
})


async function submitForm(form) {
  const isValid = await form.validate(() => null)
  if (!isValid) return
  loading.value = true
  emit('submit', userForm)
}
</script>

<template>
  <el-form
      ref="userFormRef"
      :model="userForm"
      :rules="rules"
      class="form"
      label-position="top"
  >
    <el-form-item label="Username" prop="username">
      <el-input v-model="userForm.username" @keydown.enter="submitForm(userFormRef)"></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input
          v-model="userForm.password"
          show-password
          type="password"
          @keydown.enter="submitForm(userFormRef)"
      ></el-input>
    </el-form-item>
    <el-form-item v-if="withConfirmation" label="Confirm password" prop="confirmPassword">
      <el-input
          v-model="userForm.confirmPassword"
          show-password
          type="password"
          @keydown.enter="submitForm(userFormRef)"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-checkbox v-model="userForm.stayLogged" label="Stay logged"></el-checkbox>
    </el-form-item>
    <el-form-item>
      <el-button :loading="loading"
                 style="width: 100%"
                 type="primary"
                 @click="submitForm(userFormRef)"
      >
        <slot></slot>
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.form {
  width: 60vw;
  max-width: 600px;
}
</style>