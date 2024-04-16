import CategoriesIndex from "@/pages/categories/index/categories.vue";
import CategoriesForm from "@/pages/categories/form/categories.vue";

export const routes = [
  {
    path: "/categories",
    name: "categories",
    component: CategoriesIndex,
    meta: { safe: true },
  },
  {
    path: "/categories/new",
    name: "categories-new",
    component: CategoriesForm,
    meta: { safe: true },
  },
  {
    path: "/categories/:id",
    name: "categories-form",
    component: CategoriesForm,
    meta: { safe: true },
  },
];
