<template>
  <q-card
    class="bg-transparent"
    style="max-width: 600px;border-radius:13px"
  >
    <q-card-section class="q-pa-lg bg-negative text-white">
      <q-toolbar-title class="text-h6">
        <q-icon
          size="25px"
          name="warning"
          class="q-mr-xs"
        ></q-icon>
        Delete this event ?
      </q-toolbar-title>
      <div class="q-mt-md text-body2 text-weight-medium">
        Doing so will permanently delete the data at this event id, including all nested documents and subdocuments.
      </div>
    </q-card-section>
    <q-card-section class="q-pa-lg bg-white">
      <div>
        <label class="text-grey-6 text-subtitle2">Event id path</label>
        <div class="text-bold q-mt-md text-subtitle1">/{{eventUpdateForm.keyIndex}}</div>
      </div>
      <div class="q-mt-md row">
        <label class="text-grey-6 text-subtitle2"> Confirm you want to delete this Event by typing its title: <span class="text-black text-bold">{{eventUpdateForm.eventTitle}}</span> </label>
        <slot name="confirmInput"></slot>
      </div>
    </q-card-section>
    <q-card-actions
      class="bg-white text-grey-8 q-pt-xl q-pa-lg"
      align="right"
    >
      <slot name="btnType"></slot>
    </q-card-actions>
    <q-inner-loading :showing="loading">
      <q-spinner-pie
        size="50px"
        color="primary"
      />
    </q-inner-loading>
  </q-card>
</template>

<script>
export default {
  props: ['eventUpdateForm'],
  computed: {
    loading () {
      return this.$store.state.auth.loading
    }
  },
  data () {
    return {
    }
  }
}
</script>
