<template>
  <q-page padding class="q-px-md-xl">
    <div style="font-size:28px; font-weight:500">Event judges</div>
    <q-separator class="q-my-md" color="indigo-2"></q-separator>
    <div v-if="dataIsEmpty && !pageLoading" style="height:400px">
      <contentantsEmpty>
        <template v-slot:subtitle>Looks like you ddn't enter a judge to this event yet</template>
        <template v-slot:addBtn>
          <q-btn
            color="primary"
            @click="judgesDialog = true; title = 'Create ';resetForm()"
            no-caps
          >Add judge now</q-btn>
        </template>
      </contentantsEmpty>
    </div>
    <div v-if="!dataIsEmpty && !pageLoading" class="q-mt-md q-mb-xl q-col-gutter-lg row">
      <div class="col-12">
        <q-banner inline-actions rounded bordered class="bg-indigo-1 text-black">
          <template v-slot:avatar>
            <q-icon size="md" name="assignment_ind" color="primary" />
          </template>
          These are the list of judges and there unique identifier account code.
          It's used to login there own application account during judging.
        </q-banner>
      </div>

      <judgesList
        @regenerate="regenerateBtn"
        @deleteBtn="deleteBtn"
        @editBtn="editBtn"
        :judgeInfo="judgeInfo"
        :myindex="index  "
        v-for="(judgeInfo, index) in listofJudges"
        :key="index"
      />
    </div>

    <q-dialog position="top" content-style="background-color:#3f51b559" v-model="judgesDialog">
      <createForm
        @validate="validate"
        :judgesForm="judgesForm"
        :fullname.sync="judgesForm.fullname"
      >
        <template v-slot:title>{{title}}</template>
        <template v-slot:closeBtn>
          <q-avatar class="cursor-pointer" size="35px" @click="judgesDialog = false">
            <q-icon color="primary" name="las la-times"></q-icon>
          </q-avatar>
        </template>

        <template v-slot:btnActions>
          <q-btn
            @click="validate"
            :disable="!judgesForm.fullname"
            v-if="title=='Create '"
            color="primary"
            class="full-width"
            no-caps
          >Create</q-btn>
          <q-btn
            v-else
            @click="validate"
            :disable="!judgesForm.fullname"
            color="primary"
            class="full-width"
            no-caps
          >Edit</q-btn>
        </template>
      </createForm>
    </q-dialog>

    <q-inner-loading :showing="pageLoading">
      <q-spinner-pie size="150px" color="primary" />
    </q-inner-loading>

    <q-page-sticky
      @click="judgesDialog = true; title = 'Create ';resetForm()"
      v-if="!dataIsEmpty && !pageLoading"
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn round size="lg" icon="add" glossy push color="indigo"></q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script>
import filter from "lodash/filter";
import find from "lodash/find";
import lowercase from "lodash/lowerCase";
import { fireDB } from "boot/firebase";
export default {
  data() {
    return {
      title: "",
      judgesDialog: false,
      pageLoading: true,
      judgesForm: {
        keyIndex: "",
        fullname: "",
        passCode: ""
      }
    };
  },
  methods: {
    regenerateBtn(payload) {
      const vm = this;
      this.$store.commit("auth/loading", true);
      let myPasscode = this.$randomize("A0", 6);
      setTimeout(function() {
        const judgeRef = fireDB
          .collection("Owner/CKCM/Judges")
          .doc(payload.keyIndex);
        judgeRef
          .update({
            keyIndex: payload.keyIndex,
            passCode: myPasscode,
            fullname: lowercase(payload.fullname)
          })
          .then(() => {
            vm.$store.commit("auth/loading", false);
            vm.$q.notify({
              message: "Successfully regenerated a key ",
              timeout: 4000,
              position: "bottom-right",
              icon: "las la-key"
            });
          });
      }, 2000);
    },
    resetForm() {
      this.judgesForm = {
        keyIndex: "",
        fullname: "",
        passCode
      };
    },
    editBtn(data) {
      this.title = "Edit ";
      this.judgesDialog = true;
      this.judgesForm = {
        keyIndex: data.keyIndex,
        fullname: data.fullname,
        passCode: data.passCode
      };
    },
    deleteBtn(data) {
      let vm = this;
      this.$q
        .dialog({
          title: "Confirm",
          message: `<span class="text-negative text-bold text-capitalize">${data.fullname}</span> will be permanently removed in this event`,
          cancel: true,
          persistent: true,
          html: true
        })
        .onOk(() => {
          fireDB
            .collection("Owner/CKCM/Judges/")
            .doc(data.keyIndex)
            .delete();
        })
        .onOk(() => {
          vm.$q.notify({
            message: data.name + " successfully added category ",
            timeout: 4000,
            position: "bottom-right",
            icon: "las la-user-tag"
          });
          // console.log('>>>> second OK catcher')
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
    validate() {
      let vm = this;
      if (!this.judgesForm.fullname) {
      } else {
        if (this.title === "Create ") {
          this.$store.commit("auth/loading", true);
          let myPasscode = this.$randomize("A0", 6);
          setTimeout(function() {
            vm.createJudge(myPasscode);
          }, 2000);
        } else {
          this.$store.commit("auth/loading", true);
          vm.updateJudge();
        }
      }
    },
    updateJudge() {
      const vm = this;

      this.$store
        .dispatch("judge/updateJudgeAction", {
          keyIndex: this.judgesForm.keyIndex,
          fullname: this.judgesForm.fullname,
          eventId: this.$route.params.eventId,
          passCode: this.judgesForm.passCode
        })
        .then(result => {
          vm.$store.commit("auth/loading", false);
          vm.$q.notify({
            message: result + " successfully updated as a judge ",
            timeout: 4000,
            position: "bottom-right",
            icon: "las la-user-tag"
          });
          vm.judgesDialog = false;
          vm.judgesForm.fullname = "";
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
    createJudge(passcode) {
      const vm = this;
      this.$store
        .dispatch("judge/addJudgeAction", {
          fullname: this.judgesForm.fullname,
          eventId: this.$route.params.eventId,
          passcode: passcode
        })
        .then(result => {
          vm.$store.commit("auth/loading", false);
          vm.$q.notify({
            message: result + " successfully added as a judge ",
            timeout: 4000,
            position: "bottom-right",
            icon: "las la-user-tag"
          });
          vm.judgesDialog = false;
          vm.judgesForm.fullname = "";
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
  computed: {
    listofJudges() {
      let data = filter(this.$store.state.judge.listofJudges, "keyIndex");
      return data;
    },
    dataIsEmpty() {
      let data = find(this.listofJudges, "keyIndex");
      return !data;
    }
  },
  created() {
    let vm = this;
    this.$store
      .dispatch("judge/getJudgeAction", this.$route.params.eventId)
      .then(result => {
        setTimeout(function() {
          vm.pageLoading = false;
        }, 1000);
      });
  },
  components: {
    contentantsEmpty: require("components/emptyData/contestantsEmpty.vue")
      .default,
    judgesList: require("components/sharedJudges/judgesList.vue").default,
    createForm: require("components/sharedJudges/createForm.vue").default
  }
};
</script>
