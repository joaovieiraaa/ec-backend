<template src="./input-slug.html"></template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { objLangs } from "@/utils/helpers";
// import { slugify } from "@/utils/helpers";

const props = defineProps({
  action: { default: "store", type: String },
  title: { default: "", type: String },
  note: { default: "", type: String },
  note2: { default: "", type: String },
  modelValue: { default: null },
  data: { default: null },
  isMultiLang: { default: false, type: Boolean },
});

const emits = defineEmits(["update:modelValue"]);

// const locale = window.session.locale;
// const langs = window.session.configs.languages;
// const langSelected = ref<any>(locale || langs[0]);

const objRendered = ref<any>(props.modelValue || objLangs);

const inputValue = ref<string>("");

onMounted(() => {
  // if (props.isMultiLang) {
  //   inputValue.value = slugify(objRendered.value[langSelected.value]);
  // } else inputValue.value = slugify(objRendered.value);
});

function changeLanguage(value: string) {
  // langSelected.value = value;
}

watch(
  () => inputValue.value,
  (value: string) => {
    // inputValue.value = slugify(value);

    // if (props.isMultiLang)
    //   objRendered.value[langSelected.value] = inputValue.value;
    // else objRendered.value = inputValue.value;

    emits("update:modelValue", objRendered.value);
  },
  { deep: true }
);

watch(
  () => props.data,
  (value: any) => {
    if (props.isMultiLang) {
      // langs.forEach((x: string) => {
      //   objRendered.value[x] = slugify(value[x]);
      // });
      // inputValue.value = objRendered.value[langSelected.value];
    }
  },
  { deep: true }
);

// watch(
//   () => langSelected.value,
//   (value: string) => {
//     inputValue.value = objRendered.value[value];
//   },
//   { deep: true }
// );
</script>
