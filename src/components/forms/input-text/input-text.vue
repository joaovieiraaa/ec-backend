<template src="./input-text.html"></template>

<script setup lang="ts">
import { ref, watch } from "vue";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  placeholder: { default: "", type: String },
  type: { default: "text", type: String },
  title: { default: "", type: String },
  name: { default: "", type: String },
  modelValue: { type: [String, Number], default: null },
  lang: { default: null, type: String },
  numberOnly: { default: false, type: Boolean },
  note: { default: "", type: String },
  readOnly: { default: false, type: Boolean },
  currency: { default: false, type: Boolean },
  percent: { default: false, type: Boolean },
  required: { default: false, type: Boolean },
  disabled: { default: false, type: Boolean },
  max: { default: 1000000, type: Number },
});

const previousValue = ref<any>();
const inputValue = ref<any>(props.modelValue);

watch(
  () => props.modelValue,
  () => {
    inputValue.value = props.modelValue;
  }
);

watch(
  () => inputValue.value,
  () => {
    if (props.type === "number") {
      if (inputValue.value <= props.max) {
        previousValue.value = inputValue.value;
      } else {
        inputValue.value = previousValue.value;
      }
    }

    emit("update:modelValue", inputValue.value);
  }
);

function togglePassword(event: any) {
  const passwordInput = event.target.previousElementSibling;
  const icon = event.target;

  const type = passwordInput.type === "password" ? "text" : "password";
  passwordInput.type = type;

  icon.classList.toggle("mdi-eye-outline", type === "password");
  icon.classList.toggle("mdi-eye-off-outline", type !== "password");
}
</script>
