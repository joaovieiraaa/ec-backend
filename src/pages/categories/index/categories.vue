<template src="./categories.html"></template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getAll } from "../queries";

const router = useRouter();
const objRendered = ref<Array<any>>([]);

onMounted(async () => {
  const response = await getAll();
  if (!response.hasErrors) objRendered.value = response.data;
});
</script>
