import axios from "axios";
import { generateResponse } from "@/utils/axios";
import { appStore } from "@/stores/app";
import { storeToRefs } from "pinia";
import ApiLogic from "@/services";

export const getAll = async () => {
  const response = await ApiLogic.get("/categories");
  return generateResponse(response);
};

export const store = async (payload: any) => {
  const { formOnSubmit } = storeToRefs(appStore());
  formOnSubmit.value = true;

  let queryResponse: any;

  await ApiLogic.post("/api/categories", payload)
    .then((response: any) => {
      queryResponse = response;
    })
    .catch((err: any) => {
      queryResponse = err.response;
    });

  setTimeout(() => {
    formOnSubmit.value = false;
  }, 1200);

  return generateResponse(queryResponse);
};

export const update = async (payload: any) => {
  const { formOnSubmit } = storeToRefs(appStore());
  formOnSubmit.value = true;

  let queryResponse = null;

  await axios
    .put(`/api/categories/${payload.id}`, payload)
    .then((response: any) => {
      queryResponse = response;
    })
    .catch((err: any) => {
      queryResponse = err.response;
    });

  setTimeout(() => {
    formOnSubmit.value = false;
  }, 1200);

  return generateResponse(queryResponse);
};
