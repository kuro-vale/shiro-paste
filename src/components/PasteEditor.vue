<!--suppress ES6UnusedImports -->
<script setup>
import {ElButton, ElContainer, ElForm, ElFormItem, ElInput} from "element-plus";
import CodeEditor from "simple-code-editor";
// eslint-disable-next-line no-unused-vars
import hljs from "highlight.js";
import {reactive, ref} from "vue";
import {LANG_EXTENSIONS, LANG_LIST} from "@/constants";
import {getTheme} from "@/utils";

const props = defineProps({
  paste: Object,
});
const emit = defineEmits(["submit"]);
const loading = ref(false);
const pasteForm = reactive({
  body: props.paste?.body || "",
  filename: props.paste?.filename || "",
  extension: props.paste?.extension || ""
});
const pasteFormRef = ref();
const validateBody = (rule, value, callback) => {
  if (value.trim() === "") callback("Body cannot be empty");
  callback();
};
const rules = reactive({
  filename: [
    {required: true, trigger: "change", message: "Filename cannot be empty"},
    {whitespace: true, trigger: "change", message: "Filename cannot be empty"}
  ],
  body: [
    {validator: validateBody}
  ]
});

defineExpose({
  loading
});

async function submitForm(form) {
  const isValid = await form.validate(() => null);
  if (!isValid) return;
  loading.value = true;
  emit("submit", pasteForm);
}

function getLang(lang) {
  for (const extension in LANG_EXTENSIONS) {
    if (LANG_EXTENSIONS[extension] === lang) {
      pasteForm.extension = extension;
    }
  }
}

function setLanguage() {
  if (props.paste) {
    const currentLang = [LANG_LIST.find(x => x[0] === LANG_EXTENSIONS[props.paste.extension.toLowerCase()])];
    if (!currentLang[0]) return LANG_LIST;
    return [...currentLang, ...LANG_LIST.filter(x => x[0] !== currentLang[0][0])];
  } else {
    return LANG_LIST;
  }
}
</script>

<template>
  <el-form
      ref="pasteFormRef"
      :model="pasteForm"
      :rules="rules"
      label-position="top"
  >
    <el-form-item label="Filename" prop="filename">
      <el-input
          v-model="pasteForm.filename"
          placeholder="Filename without the extension"
      />
    </el-form-item>
    <CodeEditor
        v-model="pasteForm.body"
        :autofocus="true"
        :languages="setLanguage()"
        :line-nums="true"
        :theme="getTheme()"
        height="55vh"
        width="90vw"
        @lang="getLang"
    />
    <el-form-item prop="body"/>
  </el-form>
  <el-container class="code-actions">
    <el-button :loading="loading" size="large" type="success" @click="submitForm(pasteFormRef)">
      <slot/>
    </el-button>
  </el-container>
</template>

<style scoped>
.code-actions {
  justify-content: end;
}
</style>