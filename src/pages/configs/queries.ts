import axios from "axios";
import { generateResponse } from "@/utils/axios";
import ApiLogic from "@/services";

export interface IConfigs {
  id: number;
  name: string;
  url: string;
  languages: Array<any>;
  fallback_locale: string;
  created_at: Date;
  updated_at: Date;
}

export const model = {
  id: 1,
  name: "",
  url: "",
  languages: [],
  fallback_locale: "en",
  created_at: null,
  updated_at: null,
};

export const getAll = async () => {
  const response = await ApiLogic.get("configs");
  return generateResponse(response);
};

export const update = async (payload: IConfigs) => {
  const response = await ApiLogic.put("configs", payload);
  return generateResponse(response);
};
