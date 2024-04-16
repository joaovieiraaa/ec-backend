<template>
  <div class="col-12 d-flex align-items-center justify-content-center">
    <input type="checkbox" :id="divId" switch="success" :checked="props.modelValue" />
    <label :for="divId" class="mb-0" @click="emit('change')"></label>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { randomString } from '@/helpers'

const emit = defineEmits(['change'])

const props = defineProps({
  modelValue: { default: true, type: Boolean },
  severity: { default: 'success', type: String }
})

const divId = ref<string>(`switch-${randomString()}`)
</script>
