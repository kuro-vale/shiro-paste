<script setup>
import {useRoute} from "vue-router";
import {API_URL} from "@/constants";
import PastesList from "@/components/PastesList.vue";
import {ref} from "vue";

const route = useRoute();
const userId = route.params.id;
const URL = `${API_URL}/pastes/user/${userId}`;
const title = ref("");
</script>

<template>
  <PastesList :url="URL" @pastes_username="username => title = `${username}'s pastes`">{{ title }}</PastesList>
</template>

<style scoped>

</style>