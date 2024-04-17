<template>
  <div class="text-right d-flex justify-content-end">
    <a
      class="btn btn-outline-secondary btn--icon-text me-2"
      :class="[props.disabled || formOnSubmit ? 'disabled' : '']"
    >
      <i class="zmdi zmdi-arrow-back"></i>
      {{ $t("Return Back") }}
    </a>

    <button
      class="btn btn-success btn--icon-text"
      :disabled="props.disabled || formOnSubmit"
      :class="[props.disabled || formOnSubmit ? 'disabled' : '']"
      type="submit"
      @click="$emit('save')"
    >
      <i class="zmdi zmdi-save"></i>
      {{ $t("Save") }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { appStore } from "@/stores/app";

const props = defineProps(["redirect", "disabled"]);

const { formOnSubmit } = storeToRefs(appStore());
</script>
