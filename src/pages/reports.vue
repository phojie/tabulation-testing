<template>
  <q-page padding class="q-pa-lg">
    <div style="font-size:28px; font-weight:500">Reports</div>
    <q-separator class="q-my-md" color="indigo-2"></q-separator>
    <div style="height:400px">
      <contentantsEmpty>
        <template v-slot:subtitle>Reports in this event is not yet available</template>
      </contentantsEmpty>
    </div>
  </q-page>
</template>

<script>
export default {
  components: {
    contentantsEmpty: require("components/emptyData/contestantsEmpty.vue")
      .default
  }
};
</script>
