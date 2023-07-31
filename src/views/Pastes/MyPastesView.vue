<script setup>
import {API_URL} from "@/constants";
import PastesList from "@/components/PastesList.vue";
import {useTitle} from "@vueuse/core";

useTitle("shiro-paste");
const URL = `${API_URL}/pastes/me`;
</script>

<template>
  <PastesList :url="URL">My pastes</PastesList>
</template>

<style scoped>

</style>