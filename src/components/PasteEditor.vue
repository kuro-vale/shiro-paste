<!--suppress ES6UnusedImports -->
<script setup>
import {ElButton, ElContainer, ElForm, ElFormItem, ElInput} from "element-plus";
import CodeEditor from "simple-code-editor";
// eslint-disable-next-line no-unused-vars
import hljs from "highlight.js";
import {reactive, ref} from "vue";

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
  // todo
  if (lang === "js") pasteForm.extension = ".js";
  if (lang === "txt") pasteForm.extension = ".txt";
}

function setLanguage() {
  // todo
  let langList = [["txt", "Text"], ["js", "Javascript"]];
  if (props.paste) {
    // todo
    const currentLang = [[props.paste.extension.slice(1), "Custom"]];
    return [...currentLang, ...langList.filter(x => x[0] !== currentLang[0][0])];
  } else {
    return langList;
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
        height="55vh"
        theme="github"
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