<template>
  <q-card style="width: 640px;max-width:700px " class="scrollbar-secondary q-pa-md">
    <q-toolbar>
      <q-toolbar-title class="text-h5 text-weight-medium text-blue-grey-10">
        <slot name="title"></slot>Category
      </q-toolbar-title>
      <slot name="closeBtn"></slot>
    </q-toolbar>
    <q-card-section class="q-pt-none">
      <q-linear-progress :indeterminate="loading" class="q-mt-md" color="indigo-4" :value="100" />
      <div class="row q-pa-md text-blue-grey-10 bg-indigo-1">
        <div class="q-pr-sm">
          <q-icon size="18px" color="indigo-5" name="las la-info-circle" />
        </div>
        <div
          class="col"
        >Creating a category for the criteria automatically have a default posible score of 100%</div>
      </div>
      <div class="q-mt-lg">
        <label class="text-blue-grey-9">Category name</label>
        <q-input
          autofocus
          @keyup.enter="$emit('validate')"
          @input="setCategory($event)"
          :value="category.name"
          class="q-mt-xs text-capitalize"
          placeholder="Category name to add"
          outlined
          dense
        ></q-input>
      </div>
    </q-card-section>
    <q-card-section class="q-col-gutter-md row">
      <div class="col-md-8 col-sm-12 col-sm-6">
        <q-input
          @keyup.enter="$emit('validate')"
          @input="setCriteria($event)"
          :value="category.criteriaForm.name"
          class="text-capitalize"
          placeholder="Criteria name"
          outlined
          dense
        ></q-input>
      </div>
      <div class="col-md-2 col-sm-12 col-sm-4">
        <q-input
          type="number"
          @keyup.enter="$emit('validate')"
          @input="setRating($event)"
          :value="category.criteriaForm.rating"
          class="text-capitalize"
          placeholder="Rating"
          outlined
          dense
        ></q-input>
      </div>
      <div class="col-md-2 col-xs-12">
        <q-btn
          @click="$emit('addCriteria')"
          size="sm"
          class="text-caption text-indigo-6 bg-indigo-1"
          no-caps
          outline
          label="Add"
        ></q-btn>
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-separator class="q-mb-md"></q-separator>
      <q-table
        :rows-per-page-options="[0]"
        :data="listofCategory"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:body="props">
          <q-tr :props="props" class="text-capitalize">
            <q-td key="name" :props="props">{{props.row.name}}</q-td>
            <q-td key="score" :props="props">{{props.row.rating}} %</q-td>
            <q-td key="keyIndex" :props="props">
              <q-btn
                flat
                label="Delete"
                @click="$emit('deleteCriteria',props.row.index)"
                no-caps
                dense
                class="text-caption"
              >
                <q-tooltip>Delete</q-tooltip>
              </q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card-section>

    <q-card-section>
      <slot name="btnActions"></slot>
    </q-card-section>

    <q-inner-loading :showing="loading">
      <q-spinner-pie size="50px" color="primary" />
      <q-chip
        color="primary"
        text-color="white"
        class="glossy q-mt-xl"
        icon="directions"
      >Tabulation robot is busy generating...</q-chip>
    </q-inner-loading>
  </q-card>
</template>

<script>
export default {
  props: ["category"],
  data() {
    return {
      columns: [
        {
          name: "name",
          required: true,
          label: "Criteria",
          align: "center",
          sortable: true
        },
        {
          name: "score",
          align: "center",
          label: "Posibble score",
          sortable: true
        },
        {
          name: "keyIndex",
          align: "center",
          label: "Action"
        }
      ]
    };
  },
  computed: {
    listofCategory() {
      let data = this.category.criterias;
      data.forEach((row, index) => {
        row.index = index;
      });
      return data;
    },
    loading() {
      return this.$store.state.auth.loading;
    }
  },
  methods: {
    setCategory(data) {
      this.$emit("update:name", data);
    },
    setCriteria(data) {
      this.$emit("update:criteria", data);
    },
    setRating(data) {
      this.$emit("update:rating", data);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>