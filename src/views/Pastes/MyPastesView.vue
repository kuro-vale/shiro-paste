<script setup>
import {onMounted} from "vue";
import {API_URL} from "@/constants";
import PastesList from "@/components/PastesList.vue";

onMounted(() => document.title = "shiro-paste");

const URL = `${API_URL}/pastes/me`;
</script>

<template>
  <PastesList :url="URL">My pastes</PastesList>
</template>

<style scoped>

</style>