<template>
  <q-page padding>
    <div style="font-size:28px; font-weight:500">Criteria</div>
    <q-separator class="q-my-md" color="indigo-2"></q-separator>
    <div style="height:400px">
      <contentantsEmpty>
        <template v-slot:subtitle>Looks like you ddn't enter a criteria to this event yet</template>
        <template v-slot:addBtn>
          <q-btn @click="criteriaDialog = true" color="primary" no-caps>Add Criteria now</q-btn>
        </template>
      </contentantsEmpty>
    </div>
    <!-- <div v-if="!dataIsEmpty && !pageLoading">Test</div> -->
    <q-dialog position="top" content-style="background-color:#3f51b559" v-model="criteriaDialog">
      <criteriaForm @validate="validate" :category="category" :name.sync="category.name">
        <template v-slot:title>{{title}}</template>
        <template v-slot:btnActions>
          <q-btn
            @click="validate"
            :disable="!category.name"
            v-if="title=='Create '"
            color="primary"
            class="full-width"
            no-caps
          >Create</q-btn>
          <q-btn
            v-else
            @click="validate"
            :disable="!category.name"
            color="primary"
            class="full-width"
            no-caps
          >Edit</q-btn>
        </template>
      </criteriaForm>
    </q-dialog>
  </q-page>
</template>

<script>
import find from "lodash/find";
export default {
  data() {
    return {
      title: "Create ",
      criteriaDialog: false,
      pageLoading: true,
      category: {
        name: "",
        keyIndex: ""
      }
    };
  },
  computed: {
    listofCategories() {
      return this.$store.state.category.listofCategories;
    },
    dataIsEmpty() {
      let data = find(this.listofCategories, "keyIndex");
      return !data;
    }
  },
  methods: {
    validate() {
      let vm = this;
      if (!this.category.name) {
      } else {
        if (this.title === "Create ") {
          this.$store.commit("auth/loading", true);
          setTimeout(function() {
            vm.createCategory();
          }, 2000);
        } else {
          this.$store.commit("auth/loading", true);
          vm.updateCategory();
        }
      }
    },
    createCategory() {
      const vm = this;
      this.$store
        .dispatch("category/addCategoryAction", {
          name: this.category.name,
          eventId: this.$route.params.eventId
        })
        .then(result => {
          vm.$store.commit("auth/loading", false);
          vm.$q.notify({
            message: result + " successfully added category ",
            timeout: 4000,
            position: "bottom-right",
            icon: "las la-user-tag"
          });
          vm.criteriaDialog = false;
          vm.category.name = "";
        })
        .catch(error => {
          vm.$store.commit("auth/loading", false);
          3;
          vm.$q.notify({
            message: "Internet is down, Refresh your page",
            color: "negative",
            timeout: 4000,
            position: "bottom-right",
            icon: "warning"
          });
          console.log(error);
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
  },
  components: {
    contentantsEmpty: require("components/emptyData/contestantsEmpty.vue")
      .default,
    criteriaForm: require("components/sharedCriteria/criteriaForm.vue").default
  }
};
</script>
