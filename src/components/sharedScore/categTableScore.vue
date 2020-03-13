<template>
  <div>
    <q-table
      v-if="gender === 'Male' && isDone"
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
      :data="MaleDataSorted"
      :columns="columns"
      row-key="keyIndex"
      separator="cell"
      flat
    >
      <template v-slot:top>
        <q-toolbar class="q-px-none">
          <q-toolbar-title>Male Category</q-toolbar-title>
        </q-toolbar>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="index" :props="props">{{ props.row.index }}.</q-td>
          <q-td key="name" @click="viewProfile(props.row)" :props="props">
            {{
            props.row.name
            }}
          </q-td>
          <q-td key="score" :props="props">{{ props.row.average }}</q-td>
        </q-tr>
      </template>
    </q-table>

    <q-table
      v-if="gender === 'Female'"
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
      :data="FemaleDataSorted"
      :columns="columns"
      row-key="name"
      separator="cell"
      flat
    >
      <template v-slot:top>
        <q-toolbar class="q-px-none">
          <q-toolbar-title>Female Category</q-toolbar-title>
        </q-toolbar>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="index" :props="props">{{ props.row.index }}.</q-td>
          <q-td key="name" @click="viewProfile(props.row)" :props="props">
            {{
            props.row.name
            }}
          </q-td>
          <q-td key="score" :props="props">{{ props.row.average }}</q-td>
        </q-tr>
      </template>
    </q-table>

    <q-inner-loading :showing="pageLoading">
      <q-spinner-pie size="150px" color="primary" />
    </q-inner-loading>

    <q-dialog v-model="viewProfileDialog">
      <q-card style="width: 700px; max-width: 80vw;">
        <div class="col-xs-12">
          <q-img
            :src="listDetails.profileimg"
            class="rounded-borders"
            :ratio="1"
            spinner-color="primary"
          >
            <div class="absolute-bottom text-caption text-weight-bolder cursor-pointer ellipsis">
              <span v-if="listDetails.Gender === 'Male'">Mr.</span>
              <span v-else>Ms.</span>
              {{ listDetails.fullname }}
              <q-tooltip>Mr. {{ listDetails.fullname }}</q-tooltip>
            </div>
          </q-img>

          <q-card-section>
            <span class="text-h6 text-indigo-9">❝</span>
            <span class="text-caption text-justify">
              {{
              listDetails.quotes
              }}
            </span>
          </q-card-section>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import filter from "lodash/filter";
import forEach from "lodash/forEach";
import findIndex from "lodash/findIndex";
import find from "lodash/find";
import sortBy from "lodash/sortBy";
import { fireDB } from "boot/firebase";
const columns = [
  {
    name: "index",
    label: "#",
    field: "index",
    align: "left"
  },
  {
    name: "name",
    label: "Representative",
    align: "left",
    headerClasses: "text-indigo"
  },
  {
    name: "score",
    label: "Score",
    field: "score",
    sortable: true,
    headerClasses: "text-indigo"
  }
];

export default {
  props: ["gender", "dataCateg", "tab"],
  data() {
    return {
      listDetails: [],
      viewProfileDialog: false,
      MaleData: [],
      FemaleData: [],
      scoreForm: "",
      pageLoading: true,
      pagination: {
        rowsPerPage: 0
      },
      columns
    };
  },
  computed: {
    MaleDataSorted() {
      let sortData = sortBy(this.maleDATAcomputed, "score");
      sortData.forEach((row, index) => {
        row.average = parseInt(row.score) / this.listofJudges.length;
      });
      return sortData.reverse();
    },
    FemaleDataSorted() {
      let sortData = sortBy(this.femaleDATAcomputed, "score");
      sortData.forEach((row, index) => {
        row.average = parseInt(row.score) / this.listofJudges.length;
      });
      return sortData.reverse();
    },
    listofJudges() {
      let data = filter(this.$store.state.judge.listofJudges, "keyIndex");
      return data;
    },
    user() {
      return this.$store.state.auth.user;
    },
    isDone() {
      return true;
    },
    listofScores() {
      return this.$store.state.score.listofScores;
    },
    listofContestants() {
      return this.$store.state.contestant.listofContestants;
    },
    femaleDATAcomputed() {
      let vm = this;
      console.log(this.listofJudges);
      let dataLord = [];
      forEach(this.listofContestants, function(value, key) {
        forEach(vm.listofJudges, function(judgeData, key) {
          let findData = find(vm.listofScores, [
            "yawangaIndex",
            value.female.keyIndex +
              vm.dataCateg.keyIndex +
              vm.tab +
              "Female" +
              judgeData.keyIndex
          ]);
          if (!findData) {
          } else {
            let score = findData.data.score;
            let findKey = find(dataLord, ["keyIndex", findData.data.keyIndex]);
            if (findKey) {
              score = parseInt(findKey.score) + parseInt(findData.data.score);
              let findIndexValue = findIndex(dataLord, [
                "keyIndex",
                findKey.keyIndex
              ]);
              dataLord[findIndexValue] = { ...findData.data, score };
            } else {
              dataLord.push(findData.data);
            }
          }
        });
      });

      dataLord.forEach((row, index) => {
        row.index = index + 1;
      });

      return dataLord;
    },
    maleDATAcomputed() {
      let vm = this;
      let dataMale = [];
      forEach(this.listofContestants, function(value, key) {
        if (vm.listofJudges.length != 0) {
          forEach(vm.listofJudges, function(judgeData, key) {
            let findData = find(vm.listofScores, [
              "yawangaIndex",
              value.male.keyIndex +
                vm.dataCateg.keyIndex +
                vm.tab +
                "Male" +
                judgeData.keyIndex
            ]);
            if (!findData) {
            } else {
              let score = findData.data.score;
              let findKey = find(dataMale, [
                "keyIndex",
                findData.data.keyIndex
              ]);
              if (findKey) {
                score = parseInt(findKey.score) + parseInt(findData.data.score);
                let findIndexValue = findIndex(dataMale, [
                  "keyIndex",
                  findKey.keyIndex
                ]);
                dataMale[findIndexValue] = { ...findData.data, score };
              } else {
                dataMale.push(findData.data);
                // vue.set(dataMale, key, findData.data);
              }
            }
          });
        }
      });

      dataMale.forEach((row, index) => {
        row.index = index + 1;
      });

      return dataMale;
    }
  },
  methods: {
    viewProfile(data) {
      this.listDetails = data;
      this.viewProfileDialog = true;
    },
    getMaleData() {
      let vm = this;
      forEach(this.listofContestants, function(value, key) {
        forEach(vm.listofJudges, function(judgeData, key) {
          let findData = find(vm.listofScores, [
            "yawangaIndex",
            value.male.keyIndex +
              vm.dataCateg.keyIndex +
              vm.tab +
              "Male" +
              judgeData.keyIndex
          ]);
          if (!findData) {
            // let findkeyID = findIndex(vm.MaleData, [
            //   "keyIndex",
            //   value.male.keyIndex
            // ]);
            // console.log(value.male.keyIndex, "test");
            // if (!findkeyID) {
            //   vm.MaleData.push({
            //     score: "",
            //     ...value.male
            //   });
            // }
          } else {
            let score = findData.data.score;
            let findKey = find(vm.MaleData, [
              "keyIndex",
              findData.data.keyIndex
            ]);
            if (findKey) {
              score = parseInt(findKey.score) + parseInt(findData.data.score);
              let findIndexValue = findIndex(vm.MaleData, [
                "keyIndex",
                findKey.keyIndex
              ]);
              vm.MaleData[findIndexValue] = { ...findData.data, score };
            } else {
              vm.MaleData.push(findData.data);
            }
          }
        });
      });

      vm.MaleData.forEach((row, index) => {
        row.index = index + 1;
      });
    },
    getFemaleData() {
      let vm = this;
      forEach(this.listofContestants, function(value, key) {
        forEach(vm.listofJudges, function(judgeData, key) {
          let findData = find(vm.listofScores, [
            "yawangaIndex",
            value.female.keyIndex +
              vm.dataCateg.keyIndex +
              vm.tab +
              "Female" +
              judgeData.keyIndex
          ]);
          if (!findData) {
          } else {
            let score = findData.data.score;
            let findKey = find(vm.MaleData, [
              "keyIndex",
              findData.data.keyIndex
            ]);
            if (findKey) {
              score = parseInt(findKey.score) + parseInt(findData.data.score);
              let findIndexValue = findIndex(vm.FemaleData, [
                "keyIndex",
                findKey.keyIndex
              ]);
              vm.FemaleData[findIndexValue] = { ...findData.data, score };
            } else {
              vm.FemaleData.push(findData.data);
            }
          }
        });
      });

      vm.FemaleData.forEach((row, index) => {
        row.index = index + 1;
      });
    },
    saveScore(data) {
      let vm = this;
      console.log(this.tab);
      vm.$store
        .dispatch("score/addScoreAction", {
          dataCateg: this.dataCateg,
          data: data,
          tab: this.tab,
          userAccount: this.$store.state.auth.user
        })
        .then(result => {
          vm.$q.notify({
            message: result + " successfully added a score ",
            timeout: 4000,
            position: "bottom-left",
            icon: "las la-user-tag"
          });
        });
    },
    submitScore() {
      //   let vm = this;
      //   forEach(this.MaleData, function(value) {
      //     vm.$store.dispatch("score/addScoreAction", value).then(result => {
      //       vm.$q.notify({
      //         message: result + " successfully added a score ",
      //         timeout: 4000,
      //         position: "bottom-left",
      //         icon: "las la-user-tag"
      //       });
      //     });
      //   });
    }
  },
  created() {
    const vm = this;
    this.$store.dispatch(
      "contestant/getContestantAction",
      this.$route.params.eventId
    );
    vm.pageLoading = true;
    this.$store.dispatch("score/getScoreAction");
    vm.pageLoading = true;
    this.$store
      .dispatch("judge/getJudgeAction", this.$route.params.eventId)
      .then(result => {
        setTimeout(function() {
          vm.pageLoading = false;
        }, 1000);
      });
  }
};
</script>

<style lang="scss" scoped></style>
