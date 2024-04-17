<template src="./lang-select.html"></template>

<script setup lang="ts">
import { watch, ref, onMounted } from "vue";
import i18n from "@/i18n/i18n";

const props = defineProps({
  lang: { default: i18n.global.locale.value, type: String },
});

const emit = defineEmits(["changed"]);

const objCountries = [
  { name: "PT", code: "PT" },
  { name: "FR", code: "FR" },
  { name: "DE", code: "DE" },
  { name: "ES", code: "ES" },
  { name: "EN", code: "EN" },
  { name: "PL", code: "PL" },
];

const inputValue = ref<any>();

onMounted(() => {
  inputValue.value = objCountries.find(
    (x: any) => x.code.toLowerCase() === props.lang
  ).code;
});

watch(
  () => inputValue.value,
  () => {
    emit("changed", inputValue.value);
  },
  { deep: true }
);
</script>
