<template>
  <q-page padding class="q-px-md-xl">
    <div style="font-size:28px; font-weight:500">Score</div>
    <q-separator class="q-my-md" color="indigo-2"></q-separator>
    <q-btn class="text-right" v-if="settings" @click="btnfin()" no-caps color="primary">Finish Event</q-btn>
    <q-btn class="text-right" v-else no-caps @click="btnfin()" color="negative">Unfinish Event</q-btn>
    <div v-if="dataIsEmpty && !pageLoading" style="height:400px">
      <contentantsEmpty>
        <template v-slot:subtitle>Score in this event is not yet available</template>
      </contentantsEmpty>
    </div>
    <div v-if="!dataIsEmpty && !pageLoading" class="q-mt-xl">
      <categoryTabs />
    </div>
    <q-inner-loading :showing="pageLoading">
      <q-spinner-pie size="150px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<script>
import filter from "lodash/filter";
import find from "lodash/find";
import { fireDB } from "boot/firebase";
export default {
  data() {
    return {
      pageLoading: true
    };
  },
  computed: {
    settings() {
      return this.$store.state.auth.settings;
    },
    listofCategories() {
      let data = filter(
        this.$store.state.category.listofCategories,
        "keyIndex"
      );
      return data;
    },
    dataIsEmpty() {
      let data = find(this.listofCategories, "keyIndex");
      return !data;
    }
  },
  components: {
    contentantsEmpty: require("components/emptyData/contestantsEmpty.vue")
      .default,
    categoryTabs: require("components/sharedScore/categoryTabs.vue").default
  },
  methods: {
    btnfin() {
      let vm = this;
      const judgeRef = fireDB.collection("settings").doc("1");
      judgeRef.update({
        doneAlready: !vm.settings
      });
    }
  },
  created() {
    let vm = this;
    this.$store
      .dispatch("category/getCategoryAction", this.$route.params.eventId)
      .then(result => {
        setTimeout(function() {
          vm.pageLoading = false;
        }, 1000);
      });
    this.$store
      .dispatch("auth/getSettings")
      .then(result => {
        this.$q.loading.hide();
        this.$q.loadingBar.stop();
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
