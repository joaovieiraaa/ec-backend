<template src="./configs.html"></template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { cloneObject } from "@/utils/helpers";
import { getAll, update } from "./queries";
import { model, type IConfigs } from "./queries";

// const { showGeneric, showFormErrors } = useToast();

const objCountries = [
  { name: "Portugal", code: "PT" },
  { name: "France", code: "FR" },
  { name: "Germany", code: "DE" },
  { name: "Spain", code: "ES" },
  { name: "England", code: "GB" },
  { name: "Poland", code: "PL" },
];

const objRendered = ref<IConfigs>(cloneObject(model));

onBeforeMount(async () => {
  await get();
});

async function get() {
  const response = await getAll();
  console.log(response);
  if (!response.hasErrors) objRendered.value = cloneObject(response.data);
}

function toggleLanguage(value: any): void {
  const languageIndex = objRendered.value.languages.findIndex(
    (item: any) => item === value
  );

  if (languageIndex !== -1)
    objRendered.value.languages.splice(languageIndex, 1);
  else objRendered.value.languages.push(value);
}

async function submit() {
  const response = await update(objRendered.value);

  //   if (!response.hasErrors) showGeneric("success");
  //   else showFormErrors(response.errors);
}
</script>
