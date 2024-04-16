import { objLangs } from "@/utils/helpers";

export interface ICategories {
  id: number | null;
  name: Object;
  description: Object;
  color: string;
  slug: Object;
  parent_id: number | null;
  order: number;
  active: boolean;
  created_at: Date | string;
  updated_at: Date | string;
}

export const model: ICategories = {
  id: null,
  name: objLangs,
  description: objLangs,
  color: "#ffffff",
  slug: objLangs,
  parent_id: null,
  order: 0,
  active: true,
  created_at: new Date(),
  updated_at: new Date(),
};
