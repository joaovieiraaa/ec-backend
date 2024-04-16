<template src="./input-image.html"></template>
<style lang="scss" src="./input-image.scss"></style>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    default: null,
  },
  title: {
    default: "",
    type: String,
  },
  name: {
    default: "",
    type: String,
  },
  action: {
    default: "store",
    type: String,
  },
  path: {
    default: "",
    type: String,
  },
  zone: {
    default: "",
    type: String,
  },
  data: {
    default: {},
  },
  accept: {
    default: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
    type: Array<any>,
  },
});

const emits = defineEmits(["update:modelValue"]);

// const frontendUrl = window.session.configs.url + 'uploads/'

const objModelValue = ref<any>(props.modelValue);
const objRendered = ref<any>(null);

onMounted(() => {
  if (objModelValue.value) mountImage();
});

function mountImage() {
  // if (isBase64Image(objModelValue.value)) {
  //   objRendered.value = props.modelValue
  // } else {
  //   objRendered.value = `${frontendUrl}${objModelValue.value.zone ?? props.zone}/1920xauto/${objModelValue.value.path ?? props.modelValue}`
  // }
}

function handleImage(event: any): void {
  if (props.accept.includes(event.target.files[0].type)) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = function (event: any) {
      objRendered.value = event.target.result;
      emitValue();
    };
  }
}

function remove(): void {
  objRendered.value = null;
  emitValue();
}

function emitValue() {
  emits("update:modelValue", objRendered.value);
}

watch(
  () => props.modelValue,
  (value: any) => {
    if (value) {
      objModelValue.value = value;
      mountImage();
    }
  },
  { deep: true }
);
</script>
