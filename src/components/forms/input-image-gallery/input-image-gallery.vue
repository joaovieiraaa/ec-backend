<template src="./input-image-gallery.html"></template>
<style lang="scss" src="./input-image-gallery.scss"></style>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
// import { isBase64Image, removeArrayByKey, cloneObject } from '@/utils/helpers'
import { cloneObject } from "@/utils/helpers";

const props = defineProps({
  modelValue: {
    default: () => [],
    type: Array<any>,
  },
  title: {
    default: "",
    type: String,
  },
  zone: {
    default: "",
    type: String,
  },
  maxFiles: {
    default: 5,
    type: Number,
  },
  accept: {
    default: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
    type: Array<any>,
  },
});

const emits = defineEmits(["update:modelValue", "removed"]);

// const frontUrl = `${window.session.configs.url}uploads/${props.zone}/1920xauto/`;

const objRendered = ref<any[]>(props.modelValue);
const currentImgIndex = ref<number>(props.modelValue.length);

onMounted(() => {
  // if (props.modelValue.length === 0) currentImgIndex.value = 0
});

function handleImage(event: any): void {
  if (event) {
    const mime = event.target.files[0].type;

    if (
      props.accept.includes(mime) &&
      objRendered.value.length < props.maxFiles
    ) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function (event: any) {
        objRendered.value[currentImgIndex.value] = event.target.result;
        currentImgIndex.value++;
        emitValue();
      };
    } else if (objRendered.value.length >= props.maxFiles) {
      alert("Max limit reached");
    }
  }
}

function getImgUrl(item: any) {
  // if (item) {
  //   if (isBase64Image(item)) return item;
  //   else return frontUrl + item.path;
  // }
}

function remove(key: number): void {
  // objRendered.value = removeArrayByKey(key, objRendered.value);
  if (currentImgIndex.value > 0) currentImgIndex.value--;
  emits("removed", key);
  emitValue();
}

function emitValue() {
  emits("update:modelValue", objRendered.value);
}

watch(
  () => props.modelValue,
  (value: any) => {
    objRendered.value = cloneObject(value);
  },
  { deep: true }
);
</script>
