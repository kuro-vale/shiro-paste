<script setup>
import PastesList from "@/components/PastesList.vue";
import {API_URL} from "@/constants";
import {useTitle} from "@vueuse/core";

useTitle("shiro-paste");
const URL = `${API_URL}/pastes`;
</script>

<template>
  <PastesList :url="URL">All pastes</PastesList>
</template>

<style>

</style>