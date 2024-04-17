<template src="./input-select.html"></template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  title: { default: "", type: String },
  keyExpr: { default: "name", type: String },
  keyValue: { default: "value", type: String },
  note: { default: null },
  disabled: { default: false, type: Boolean },
  required: { default: false, type: Boolean },
  modelValue: { default: [], type: Array<any> },
  options: { default: [], type: Array<any> },
});

const emit = defineEmits(["update:modelValue"]);

const inputValue = ref<any>(props.modelValue);

watch(
  () => inputValue.value,
  (value: any) => {
    emit("update:modelValue", value);
  },
  { deep: true }
);

watch(
  () => props.modelValue,
  (value: any) => {
    inputValue.value = value;
  },
  { deep: true }
);
</script>
