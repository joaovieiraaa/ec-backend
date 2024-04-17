<template src="./categories.html"></template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { store, update } from "../queries";
import { model, type ICategories } from "../model";
import { cloneObject } from "@/utils/helpers";
import i18n from "@/i18n/i18n";

const props = defineProps(["data", "categories"]);

// const { showGeneric, showFormErrors } = useToast();
// const { $configs } = useApp();

const action = ref<"store" | "update">("store");
const lang = ref<string>(i18n.global.locale.value);
const objRendered = ref<ICategories>(cloneObject(model));

onMounted(() => {
  // if (props.data.id) {
  //   action.value = "update";
  //   objRendered.value = props.data;
  // }
  // props.categories.forEach((x: any) => {
  //   objCategories.value.push({ value: x.id, label: x.name[$configs.locale] });
  // });
});

async function submit(): Promise<void> {
  // let response = null;
  // if (action.value === "store") response = await store(objRendered.value);
  // else response = await update(objRendered.value);
  // if (!response.hasErrors) showGeneric("success", routes.categories);
  // else showFormErrors(response.errors);
}
</script>
