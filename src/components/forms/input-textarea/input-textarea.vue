<template>
  <div class="form-group mb-3">
    <p class="fw-bold" v-if="props.title">
      {{ $t(props.title) }}
      <span v-if="props.required" style="color: red">*</span>
    </p>

    <textarea class="form-control" v-model="inputValue"></textarea>

    <p class="mb-0" v-if="note">
      <small>{{ note }}</small>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { objLangs, randomString } from "@/utils/helpers";
import i18n from "@/i18n/i18n";

const props = defineProps({
  title: { default: "", type: String },
  name: { default: "", type: String },
  modelValue: {
    default: () => ({}),
    type: Object as any,
  },
  lang: {
    default: i18n.global.locale.value,
    type: String,
  },
  note: { default: "", type: String },
  isMultiLang: { default: false, type: Boolean },
  required: { default: false, type: Boolean },
});

const emit = defineEmits(["update:modelValue"]);

const lang = ref<any>(props.lang);

const objRendered = ref<any>(props.modelValue || objLangs);
const inputValue = ref<any>();

onMounted(() => {
  console.log(props.modelValue);
  if (props.isMultiLang) inputValue.value = props.modelValue[lang.value];
  else inputValue.value = props.modelValue;
});

function changeLanguage(value: any) {
  lang.value = value;
}

watch(
  () => inputValue.value,
  (value: any) => {
    if (props.isMultiLang) objRendered.value[lang.value] = value;
    else objRendered.value = value;

    emit("update:modelValue", objRendered.value);
  },
  { deep: true }
);

watch(
  () => lang.value,
  (value: string) => {
    inputValue.value = objRendered.value[value];
  },
  { deep: true }
);
</script>
