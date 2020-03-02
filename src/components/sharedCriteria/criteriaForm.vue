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
  computed: {
    loading() {
      return this.$store.state.auth.loading;
    }
  },
  methods: {
    setCategory(data) {
      this.$emit("update:name", data);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>