<template>
  <div class="form-group" :class="mb">
    <label v-if="title" class="label-lg">{{ $t(title) }}</label>
    <div v-if="type != 'password'" class="input-group">
      <input
        v-if="type != 'password'"
        class="form-control"
        v-model="inputValue"
        :name="props.name"
        :max="props.max"
        :placeholder="placeholder"
        :type="props.type"
        :is-required="props.name + (props.lang ? '_' + props.lang : '')"
        :readOnly="readOnly"
        :required="props.required"
        :disabled="props.disabled"
      />
      <span class="input-group-text" v-if="props.currency || props.percent">
        <template v-if="props.currency">€</template>
        <template v-else-if="props.percent">%</template>
      </span>
    </div>
    <div v-else class="input-group">
      <input
        class="form-control"
        v-model="inputValue"
        :placeholder="placeholder"
        :type="props.type"
        :is-required="props.name + (props.lang ? '_' + props.lang : '')"
        :required="props.required"
        :disabled="props.disabled"
      />
      <button
        class="btn btn-info mdi mdi-eye-outline"
        type="button"
        @click="togglePassword"
      ></button>
    </div>
    <p v-if="props.note" class="mb-0">
      <small>{{ props.note }}</small>
    </p>
    <forms-validation
      :name="props.name + (props.lang ? '_' + props.lang : '')"
    />
  </div>
</template>

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
  mb: { default: "mb-3", type: String },
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
