<template src="./login.html"></template>

<script setup lang="ts">
import { ref } from "vue";
import { login } from "@/services/auth/auth.services";
import { createCookie } from "@/utils/cookies";
import { useRouter } from "vue-router";

const router = useRouter();

const objRendered = ref<any>({
  email: null,
  password: null,
});

async function submit() {
  const response = await login(objRendered.value);

  if (!response.hasErrors) {
    createCookie("_", response.data.token);
    router.push({ name: "dashboard" });
  }
}
</script>
