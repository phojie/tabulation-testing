<template>
  <q-page padding class="q-px-md-xl">
    <div style="font-size:28px; font-weight:500">Reports</div>
    <q-separator class="q-my-md" color="indigo-2"></q-separator>
    <div v-if="dataIsEmpty && !pageLoading" style="height:400px">
      <contentantsEmpty>
        <template v-slot:subtitle>Reports in this event is not yet available</template>
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
export default {
  data() {
    return {
      pageLoading: true
    };
  },
  computed: {
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
  created() {
    let vm = this;
    this.$store
      .dispatch("category/getCategoryAction", this.$route.params.eventId)
      .then(result => {
        setTimeout(function() {
          vm.pageLoading = false;
        }, 1000);
      });
  }
};
</script>
