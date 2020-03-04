<template>
  <q-page padding>
    <div style="font-size:28px; font-weight:500">Criteria</div>
    <q-separator class="q-my-md" color="indigo-2"></q-separator>
    <div v-if="dataIsEmpty && !pageLoading" style="height:400px">
      <contentantsEmpty>
        <template v-slot:subtitle>Looks like you ddn't enter a criteria to this event yet</template>
        <template v-slot:addBtn>
          <q-btn @click="criteriaDialog = true" color="primary" no-caps>Add Criteria now</q-btn>
        </template>
      </contentantsEmpty>
    </div>
    <div v-if="!dataIsEmpty && !pageLoading" class="row q-col-gutter-md">
      <criteriaLists
        @deleteBtn="deleteBtn"
        @upddateBtn="updateBtn"
        :key="index"
        v-for="(listData,index) in listofCategories"
        :listData="listData"
      />
    </div>
    <q-dialog position="top" content-style="background-color:#3f51b559" v-model="criteriaDialog">
      <criteriaForm
        :criteria.sync="category.criteriaForm.name"
        :rating.sync="category.criteriaForm.rating"
        @validate="validate"
        @addCriteria="validateCriteria"
        @deleteCriteria="deleteCriteria"
        :category="category"
        :name.sync="category.name"
      >
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
    <q-inner-loading :showing="pageLoading">
      <q-spinner-pie size="150px" color="primary" />
    </q-inner-loading>

    <q-page-sticky v-if="!dataIsEmpty && !pageLoading" position="bottom-right" :offset="[18, 18]">
      <q-btn
        size="md"
        @click="criteriaDialog = true; title = 'Create '"
        icon="add"
        glossy
        push
        color="indigo"
      ></q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script>
import find from "lodash/find";
import filter from "lodash/filter";
import forEach from "lodash/forEach";
import { fireDB } from "boot/firebase";
import vue from "vue";
export default {
  data() {
    return {
      title: "Create ",
      criteriaDialog: false,
      pageLoading: true,
      category: {
        name: "",
        keyIndex: "",
        criteriaForm: {
          name: "",
          rating: ""
        },
        criterias: []
      },
      dummyCriterias: []
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
  methods: {
    updateBtn(data) {
      let vm = this;
      const list = data.criteriaList;
      this.title = "Edit ";
      this.criteriaDialog = true;
      this.category.name = data.name;
      this.category.keyIndex = data.keyIndex;
      forEach(list, function(value, key) {
        vue.set(vm.dummyCriterias, key, value);
      });
      this.category.criterias = this.dummyCriterias;
    },
    deleteBtn(data) {
      let vm = this;
      this.$q
        .dialog({
          title: "Confirm",
          message: `<span class="text-negative text-bold text-capitalize">${data.name}</span> will be permanently removed in the category`,
          cancel: true,
          persistent: true,
          html: true
        })
        .onOk(() => {
          fireDB
            .collection("Owner/CKCM/Categories/")
            .doc(data.keyIndex)
            .delete();
        })
        .onOk(() => {
          vm.$q.notify({
            message: data.name + " successfully deleted category ",
            timeout: 4000,
            position: "bottom-right",
            icon: "las la-user-tag"
          });
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
    deleteCriteria(index) {
      vue.delete(this.category.criterias, index);
    },
    validateCriteria() {
      let data = this.category.criteriaForm;
      this.category.criterias.push(data);
      this.category.criteriaForm = {
        name: "",
        rating: ""
      };
    },
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
          criteriaList: this.category.criterias,
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
          vm.category = {
            name: "",
            keyIndex: "",
            criteriaForm: {
              name: "",
              rating: ""
            },
            criterias: []
          };
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
    },
    updateCategory() {
      const vm = this;
      this.$store
        .dispatch("category/updateCategoryAction", {
          keyIndex: this.category.keyIndex,
          name: this.category.name,
          criteriaList: this.category.criterias,
          eventId: this.$route.params.eventId
        })
        .then(result => {
          vm.$store.commit("auth/loading", false);
          vm.$q.notify({
            message: result + " successfully updated category ",
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
    criteriaForm: require("components/sharedCriteria/criteriaForm.vue").default,
    criteriaLists: require("components//sharedCriteria/criteriaLists.vue")
      .default
  }
};
</script>
