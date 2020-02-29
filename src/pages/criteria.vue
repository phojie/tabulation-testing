<template>
  <q-page padding>
    <div style="font-size:28px; font-weight:500">Criteria</div>
    <q-separator class="q-my-md" color="indigo-2"></q-separator>
    <div style="height:400px">
      <contentantsEmpty>
        <template v-slot:subtitle>Looks like you ddn't enter a criteria to this event yet</template>
        <template v-slot:addBtn>
          <q-btn color="primary" no-caps>Add Criteria now</q-btn>
        </template>
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
