<template src="./input-color.html"></template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  readonly: {
    default: false,
    type: Boolean
  },
  title: {
    default: '',
    type: String
  },
  modelValue: {
    default: '',
    type: String
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const inputValue = ref<string>('')

onMounted(() => {
  inputValue.value = props.modelValue
})

watch(
  () => inputValue.value,
  (value: string) => {
    emit('update:modelValue', value)
  },
  { deep: true }
)

watch(
  () => props.modelValue,
  (value: string) => {
    inputValue.value = value
  },
  { deep: true }
)
</script>
