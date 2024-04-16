<template>
  <div class="d-flex align-items-center justify-content-between mb-4">
    <h3 class="card-title" v-if="props.label">{{ $t(props.label) }}</h3>
    <div class="d-flex justify-content-end" :class="{ 'col-12': !props.label }">
      <button
        v-if="props.export"
        class="btn btn-primary my-2 me-2"
        :class="{ disabled: !columnsData.length }"
        @click="exportAsDoc('xlsx')"
      >
        {{ $t("Export Excel") }}
      </button>
      <slot name="actions"></slot>
    </div>
  </div>

  <DataTable
    class="p-datatable-sm"
    filterDisplay="row"
    ref="datatable"
    v-model:filters="filters"
    :value="props.values"
    :dataKey="props.dataKey"
    :rows="15"
    :loading="props.isLoading"
    :paginator="props.paginator"
    stripedRows
    removableSort
  >
    <template #empty>{{ $t("No data") }}</template>

    <Column
      v-for="(item, key) in columnsData"
      :sortable="item.sortable"
      :field="item.field"
      :filterField="item.field"
      :header="$t(item.name)"
      :key="key"
      :showFilterMenu="item.showFilterMenu ?? false"
      :bodyClass="item.bodyClass"
      :style="[
        'max-width:' + item.maxWidth + 'px;',
        'min-width:' + item.minWidth + 'px;',
      ]"
    >
      <template #body="{ data }">
        <template v-if="item.type === 'image'">
          <img style="height: 100%; width: 80px" alt="row pic" />
        </template>

        <template v-else-if="item.type === 'boolean'">
          <forms-primetable-active
            v-model="data[item.field]"
            :severity="getSeverity(data[item.field])"
            @change="changeActive(data.id, item.field, data[item.field])"
          />
        </template>

        <!-- <template v-else-if="item.type === 'instantEditor'">
          <products-components-instant-price-editor
            v-if="item.field === 'price'"
            :product="data"
            :key="data.id"
          />
          <products-components-instant-stock-editor
            v-if="item.field === 'stock'"
            :product="data"
            :key="data.id"
          />
        </template> -->

        <template v-else-if="item.type === 'options'">
          <div class="d-flex align-item-center justify-content-center gap-2">
            <a v-if="item.options.edit" class="btn btn-outline-primary">
              <span class="mdi mdi-pencil"></span>
            </a>

            <a v-if="item.options.view" class="btn btn-primary">
              <span class="mdi mdi-eye-outline"></span>
            </a>

            <button
              v-if="item.options.delete"
              class="btn btn-outline-danger"
              @click="destroyRecord(data.id)"
            >
              <span class="mdi mdi-delete"></span>
            </button>
          </div>
        </template>

        <template v-else-if="item.type === 'text' || item.type === 'currency'">
          {{ data[item.field] }}
          <span v-if="item.type === 'currency'">€</span>
        </template>

        <template v-else-if="item.type === 'pre'">
          <pre v-html="data[item.field]"></pre>
        </template>

        <template v-else-if="item.type === 'html'">
          <div v-html="data[item.field]"></div>
        </template>

        <template v-else-if="item.type === 'badge'">
          <span class="badge" :class="data[item.badge_class]">{{
            data[item.badge_text]
          }}</span>
        </template>

        <!-- <template v-else-if="item.type === 'component'">
          <component :is="item.component" :item="data"></component>
        </template> -->
      </template>

      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-if="item.search && item.searchType === 'input'"
          v-model="filterModel.value"
          class="p-column-filter"
          :placeholder="$t('Search')"
          @input="filterCallback()"
        />

        <Dropdown
          v-if="item.search && item.searchType === 'dropdown'"
          v-model="filterModel.value"
          placeholder="Select One"
          class="p-column-filter"
          :options="item.filterEqualsOptions ?? props.filterEqualsOptions"
          @change="filterCallback()"
          showClear
        >
          <template #option="slotProps">
            <Tag
              :value="getValue(slotProps.option)"
              :severity="getSeverity(slotProps.option)"
            />
          </template>
        </Dropdown>
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
// import { route, frontendUrl, $t, exportXlsxDatagrid } from '@/helpers'

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import Tag from "primevue/tag";
import Dropdown from "primevue/dropdown";
import { FilterMatchMode } from "primevue/api";

// import { DataTableColumn } from "./types";
// import { active, destroy } from "./queries";

// const { showGeneric, showConfirmation } = useToast();

const emit = defineEmits(["reload"]);

const props = defineProps({
  label: { default: "", type: String },
  context: { default: "", type: String },
  contextParameter: { default: "", type: String },
  image_folder: { default: "products", type: String },
  values: { default: () => [], type: Array<any> },
  isLoading: { default: false, type: Boolean },
  columns: { default: () => [], type: Array<any[]> },
  dataKey: { default: "id", type: String },
  export: { default: false, type: Boolean },
  emitReload: { default: false, type: Boolean },
  paginator: { default: true, type: Boolean },
  filterEqualsOptions: { default: [true, false] },
});

// const routeShow = $routes![`${props.context as any}_show`];
// const routeForm = $routes![`${props.context as any}_form`];

const datatable = ref<any>();
const columnsData = ref<any[]>([]);

const filters = ref<any>({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

// onMounted(() => {
//   columnsData.value = [...props.columns];
//   columnsData.value.forEach((x: any) => {
//     if (x.search) {
//       filters.value[x.field] = {
//         value: x.searchDefault || null,
//         matchMode: FilterMatchMode.CONTAINS,
//       };
//     }
//   });
// });

// async function changeActive(id: number, field: string, value: boolean) {
//   const response = await active(props.context, id, {
//     field: field,
//     value: value,
//   });
//   if (!response.hasErrors) {
//     if (props.emitReload) emit("reload");
//     showGeneric("success");
//   } else {
//     showGeneric("error");
//   }
// }

// async function destroyRecord(value: any) {
//   showConfirmation(async () => {
//     const response = await destroy(
//       props.context,
//       props.contextParameter,
//       value
//     );
//     if (!response.hasErrors) {
//       if (props.emitReload) emit("reload");
//       showGeneric("success");
//     } else {
//       showGeneric("error");
//     }
//   });
// }

// async function exportAsDoc(type: string) {
//   if (type === "xlsx")
//     exportXlsxDatagrid(props.context, columnsData.value, datatable.value.value);
// }

// function getValue(value: any) {
//   if (props.context === "orders") {
//     if (value === 1) return "pending";
//     if (value === 2) return "processing";
//     if (value === 3) return "sent";
//     if (value === 4) return "finished";
//     if (value === 5) return "refunded";
//     if (value === 6) return "expired";
//   } else return value;
// }

// function getSeverity(status: any) {
//   if (status === true) return "success";
//   else if (props.context === "orders" && status === 1) return "warning";
//   else if (props.context === "orders" && status === 2) return "info";
//   else if (props.context === "orders" && status === 3) return "success";
//   else if (props.context === "orders" && status === 4) return "success";
//   else return "danger";
// }
</script>
