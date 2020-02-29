<template>
  <q-page padding class="q-px-md-xl">
    <div style="font-size:28px; font-weight:500">Event judges</div>
    <q-separator class="q-my-md" color="indigo-2"></q-separator>
    <div v-if="false" style="height:400px">
      <contentantsEmpty>
        <template v-slot:subtitle>Looks like you ddn't enter a judge to this event yet</template>
        <template v-slot:addBtn>
          <q-btn color="primary" no-caps>Add judge now</q-btn>
        </template>
      </contentantsEmpty>
    </div>
    <div class="q-my-lg">
      <judgesList />
    </div>
  </q-page>
</template>

<script>
export default {
  components: {
    contentantsEmpty: require("components/emptyData/contestantsEmpty.vue")
      .default,
    judgesList: require("components/sharedJudges/judgesList.vue").default
  }
};
</script>
