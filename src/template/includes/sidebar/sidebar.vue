<template src="./sidebar.html"></template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { init } from "./sidebar";

const router = useRouter();

onMounted(() => {
  init();
});
</script>
