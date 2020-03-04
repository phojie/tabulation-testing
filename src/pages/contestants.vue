<template>
  <q-page padding class="q-px-md-xl">
    <div class="row justify-between">
      <div style="font-size:28px; font-weight:500">Contestants</div>
    </div>
    <q-separator class="q-my-md" color="indigo-2"></q-separator>

    <div v-if="dataIsEmpty && !pageLoading" style="height:400px">
      <contentantsEmpty>
        <template v-slot:subtitle>Looks like you ddn't enter a contestant to this event yet</template>
        <template v-slot:addBtn>
          <q-btn
            color="primary"
            no-caps
            @click="$v.candidatesData.$reset(), createContestantDialog = true, dialogTitle = 'create ', resetForm()"
          >Create contestant now</q-btn>
        </template>
      </contentantsEmpty>
    </div>

    <div v-if="!dataIsEmpty && !pageLoading" class="q-col-gutter-md row q-my-lg q-mb-xl">
      <contestantList
        :listDetails="listDetails"
        @viewBtn="viewBtn"
        v-for="(listDetails, index) in listofContestants"
        :key="index"
      ></contestantList>
    </div>

    <q-dialog content-style="background-color:#3f51b559" v-model="createContestantDialog">
      <contestantsCreateForm
        @addMalePicture="addMalePicture"
        @addFemalePicture="addFemalePicture"
        :candidatesData="candidatesData"
        :femaleFullname.sync="candidatesData.female.fullname"
        :femaleYearlevel.sync="candidatesData.female.yearlevel"
        :femaleAge.sync="candidatesData.female.age"
        :femaleQuotes.sync="candidatesData.female.quotes"
        :maleFullname.sync="candidatesData.male.fullname"
        :maleYearlevel.sync="candidatesData.male.yearlevel"
        :maleAge.sync="candidatesData.male.age"
        :maleQuotes.sync="candidatesData.male.quotes"
        :candidatesRepresent.sync="candidatesData.candidatesRepresent"
        :validations="$v.candidatesData"
      >
        <template v-slot:dialogTitle>{{dialogTitle}}</template>
        <template v-slot:closeBtn>
          <q-avatar class="cursor-pointer" @click="createContestantDialog = false" size="35px">
            <q-icon color="primary" name="las la-times"></q-icon>
          </q-avatar>
        </template>
        <template v-slot:createBtn>
          <q-btn
            v-if="dialogTitle === 'create '"
            color="primary"
            :disable="$v.candidatesData.$error"
            class="full-width"
            @click="validate"
            no-caps
          >Create</q-btn>
          <template v-else class="full-width">
            <q-btn color="negative" @click="deleteCandidate" no-caps>Delete</q-btn>
            <q-btn
              color="warning"
              :disable="$v.candidatesData.$error"
              class="col"
              @click="validate"
              no-caps
            >Update</q-btn>
          </template>
        </template>
      </contestantsCreateForm>
    </q-dialog>

    <q-inner-loading :showing="pageLoading">
      <q-spinner-pie size="150px" color="primary" />
    </q-inner-loading>

    <q-page-sticky
      @click="$v.candidatesData.$reset(), createContestantDialog = true, dialogTitle = 'create ', resetForm()"
      v-if="!dataIsEmpty && !pageLoading"
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn size="md" icon="add" glossy push color="indigo"></q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { required, numeric } from "vuelidate/lib/validators";
import find from "lodash/find";
import { mapGetters, mapState } from "vuex";
import { boot } from "quasar/wrappers";
export default {
  validations: {
    candidatesData: {
      male: {
        fullname: { required },
        yearlevel: { required },
        age: { required, numeric }
      },
      female: {
        fullname: { required },
        yearlevel: { required },
        age: { required, numeric }
      },
      candidatesRepresent: { required }
    }
  },
  data() {
    return {
      dialogTitle: "",
      imgUrl: null,
      pageLoading: true,
      createContestantDialog: false,
      candidatesData: {
        male: {
          fullname: "",
          yearlevel: "",
          age: "",
          quotes: "",
          keyIndex: "",
          dummyprofileimg: "",
          profileimg: {
            __img: {
              src: ""
            }
          }
        },
        female: {
          fullname: "",
          yearlevel: "",
          age: "",
          quotes: "",
          keyIndex: "",
          dummyprofileimg: "",
          profileimg: {
            __img: {
              src: ""
            }
          }
        },
        keyIndex: "",
        representKeyIndex: "",
        candidatesRepresent: ""
      }
    };
  },
  computed: {
    ...mapState("contestant", [""]),
    ...mapGetters("contestant", ["listofContestants"]),
    dataIsEmpty() {
      let data = find(this.listofContestants, "name");

      return !data;
    }
  },
  methods: {
    deleteCandidate() {
      let vm = this;
      vm.$store.commit("auth/loading", true);
      this.$store
        .dispatch("contestant/deleteContestantAction", this.candidatesData)
        .then(result => {
          vm.createContestantDialog = false;
          vm.$store.commit("auth/loading", false);
          vm.$q.notify({
            message: "Candidates successfully deleted ",
            timeout: 4000,
            position: "bottom-right",
            icon: "las la-user-tag"
          });
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
    viewBtn(data) {
      this.resetForm();
      this.candidatesData = {
        male: {
          fullname: data.male.fullname,
          yearlevel: data.male.yearlevel,
          age: data.male.age,
          quotes: data.male.quotes,
          keyIndex: data.male.keyIndex,
          dummyprofileimg: data.male.profileimg,
          profileimg: {
            __img: {
              src: data.male.profileimg
            }
          }
        },
        female: {
          fullname: data.female.fullname,
          yearlevel: data.female.yearlevel,
          age: data.female.age,
          quotes: data.female.quotes,
          keyIndex: data.female.keyIndex,
          dummyprofileimg: data.female.profileimg,
          profileimg: {
            __img: {
              src: data.female.profileimg
            }
          }
        },
        representKeyIndex: data.representKeyIndex,
        candidatesRepresent: data.name
      };
      this.createContestantDialog = true;
      this.dialogTitle = "Edit ";
    },
    addMalePicture(data) {
      let imgData = data[0];
      this.candidatesData.male.profileimg = imgData;
    },
    addFemalePicture(data) {
      let imgData = data[0];
      this.candidatesData.female.profileimg = imgData;
    },
    validate(type) {
      this.$v.candidatesData.$touch();
      if (this.$v.candidatesData.$error) {
      } else {
        if (this.dialogTitle === "create ") {
          this.createCandidate();
        } else {
          this.updateCandidate();
        }
      }
    },
    updateCandidate() {
      const vm = this;
      this.$store
        .dispatch("contestant/updateContestantAction", {
          data: this.candidatesData,
          eventId: this.$route.params.eventId
        })

        .then(result => {
          vm.$store.commit("auth/loading", false);
          vm.$q.notify({
            message: result + " candidates successfully updated ",
            timeout: 4000,
            position: "bottom-right",
            icon: "las la-user-tag"
          });
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
    resetForm() {
      this.candidatesData = {
        male: {
          fullname: "",
          yearlevel: "",
          age: "",
          quotes: "",
          keyIndex: "",
          profileimg: {
            __img: {
              src: ""
            }
          }
        },
        female: {
          fullname: "",
          yearlevel: "",
          age: "",
          quotes: "",
          keyIndex: "",
          profileimg: {
            __img: {
              src: ""
            }
          }
        },
        keyIndex: "",
        candidatesRepresent: ""
      };
    },
    createCandidate() {
      const vm = this;
      this.$store
        .dispatch("contestant/addContestantAction", {
          data: this.candidatesData,
          eventId: this.$route.params.eventId
        })
        .then(result => {
          vm.$store.commit("auth/loading", false);
          vm.$q.notify({
            message: result + " candidates successfully added ",
            timeout: 4000,
            position: "bottom-right",
            icon: "las la-user-tag"
          });
          vm.resetForm();
          vm.$v.candidatesData.$reset();
        })
        .catch(error => {
          vm.$store.commit("auth/loading", false);
          vm.$q.notify({
            message: "Something is wrong, Refresh your page",
            color: "negative",
            timeout: 4000,
            position: "bottom-right",
            icon: "warning"
          });
          console.log(error);
        });
    }
  },
  beforeDestroy() {
    this.$store.commit("contestant/RESET_listofContestants");
  },
  created() {
    const vm = this;
    this.$store
      .dispatch("contestant/getContestantAction", this.$route.params.eventId)
      .then(result => {
        setTimeout(function() {
          vm.pageLoading = false;
        }, 1000);
      });
  },
  components: {
    contestantsCreateForm: require("components/sharedContestants/createForm.vue")
      .default,
    contentantsEmpty: require("components/emptyData/contestantsEmpty.vue")
      .default,
    contestantList: require("components/sharedContestants/contestantLists")
      .default
  }
};
</script>
