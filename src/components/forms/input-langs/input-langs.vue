<template src="./input-langs.html"></template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { objLangs, cloneObject, floatify } from "@/utils/helpers";
import i18n from "@/i18n/i18n";

const props = defineProps({
  readonly: {
    default: false,
    type: Boolean,
  },
  title: {
    default: "",
    type: String,
  },
  modelValue: {
    default: () => ({}),
    type: Object as any,
  },
  lang: {
    default: i18n.global.locale.value,
    type: String,
  },
  numberOnly: {
    default: false,
    type: Boolean,
  },
  note: {
    default: "",
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

// const langs = $configs.languages;
const lang = ref<any>(props.lang);
const data = ref<any>(props.modelValue || objLangs);
const inputValue = ref<any>(props.modelValue[lang.value]);

function changeLanguage(value: any) {
  lang.value = value;
}

watch(
  () => inputValue.value,
  (value: any) => {
    data.value[lang.value] = props.numberOnly ? floatify(value) : value;

    emit("update:modelValue", data.value);
  },
  { deep: true }
);

watch(
  () => props.modelValue,
  (value: any) => {
    data.value = cloneObject(value);
    inputValue.value = value[lang.value];
  }
);

watch(
  () => props.lang,
  (value: string) => {
    lang.value = value;
  }
);

watch(
  () => lang.value,
  (value: string) => {
    inputValue.value = data.value[value];
  },
  { deep: true }
);
</script>
