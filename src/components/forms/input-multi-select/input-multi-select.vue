<template src="./input-multi-select.html"></template>

<script setup lang="ts">
import { ref, watch } from "vue";
import MultiSelect from "primevue/multiselect";

const props = defineProps({
  title: { default: "", type: String },
  required: { default: false, type: Boolean },
  modelValue: { default: [], type: Array<any> },
  data: { default: [], type: Array<any> },
});

const inputValue = ref<any[]>(props.modelValue);

const emit = defineEmits(["update:modelValue"]);

watch(
  () => inputValue.value,
  (value: any) => {
    console.log(value);
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
