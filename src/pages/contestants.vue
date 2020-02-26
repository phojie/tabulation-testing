<template>
  <q-page
    padding
  >
    <div class="row justify-between">
      <div style="font-size:28px; font-weight:500">
        Contestants {{listofAllCandidates}}
      </div>
    </div>
    <q-separator
      class="q-my-md"
      color="indigo-2"
    ></q-separator>
    <pre>
      {{listofContestants}}
    </pre>
    <div v-if="dataIsEmpty && !pageLoading" style="height:400px">
      <contentantsEmpty>
        <template v-slot:subtitle>
          Looks like you ddn't enter a contestant to this event yet
        </template>
        <template v-slot:addBtn>
          <q-btn
            color="primary"
            no-caps=""
            @click="createContestantDialog = true"
          >Create contestant now</q-btn>
        </template>
      </contentantsEmpty>
    </div>

    <div v-if="!dataIsEmpty && !pageLoading" class="q-my-lg">
      <contestantList></contestantList>
    </div>

    <q-dialog
      full-height
      content-style="background-color:#3f51b559"
      v-model="createContestantDialog"
     >
      <contestantsCreateForm
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
        <template v-slot:closeBtn>
          <q-avatar
            class="cursor-pointer"
            @click="createContestantDialog=false"
            size="35px"
          >
            <q-icon
              color="primary"
              name="las la-times"
            ></q-icon>
          </q-avatar>
        </template>
        <template v-slot:createBtn>
          <q-btn color="primary" :disable="$v.candidatesData.$error" class="full-width" @click="validate" no-caps>Create</q-btn>
        </template>
      </contestantsCreateForm>
    </q-dialog>

    <q-inner-loading :showing="pageLoading">
      <q-spinner-pie
        size="150px"
        color="primary"
      />
    </q-inner-loading>

    <q-page-sticky @click="createContestantDialog = true" v-if="!dataIsEmpty && !pageLoading" position="bottom-right" :offset="[18, 18]">
      <q-btn
        round
        size="lg"
        icon="add"
        glossy
        push
        color="indigo"
      >
      </q-btn>
    </q-page-sticky>

  </q-page>
</template>

<script>
import { required, numeric } from 'vuelidate/lib/validators'
// import filter from 'lodash/filter'
import { mapGetters, mapState } from 'vuex'
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
  data () {
    return {
      dataIsEmpty: false,
      pageLoading: true,
      createContestantDialog: false,
      candidatesData: {
        male: {
          fullname: '',
          yearlevel: '',
          age: '',
          quotes: '',
          keyIndex: ''
        },
        female: {
          fullname: '',
          yearlevel: '',
          age: '',
          quotes: '',
          keyIndex: ''
        },
        keyIndex: '',
        candidatesRepresent: ''
      }
    }
  },
  computed: {
    ...mapState('contestant', ['listofContestants']),
    ...mapGetters('contestant', ['listofAllCandidates'])
  },
  methods: {
    validate () {
      if (this.$v.candidatesData.$error) {
        this.$v.candidatesData.$touch()
      } else {
        this.createCandidate()
      }
    },
    resetForm () {
      this.candidatesData = {
        male: {
          fullname: '',
          yearlevel: '',
          age: '',
          quotes: '',
          keyIndex: ''
        },
        female: {
          fullname: '',
          yearlevel: '',
          age: '',
          quotes: '',
          keyIndex: ''
        },
        keyIndex: '',
        candidatesRepresent: ''
      }
    },
    createCandidate () {
      const vm = this
      this.$store.dispatch('contestant/addContestantAction', {
        data: this.candidatesData,
        eventId: this.$route.params.eventId
      })
        .then(result => {
          vm.$store.commit('auth/loading', false)
          vm.$q.notify({
            message: result + ' candidates successfully added ',
            color: 'positive',
            timeout: 4000,
            position: 'bottom-right',
            icon: 'las la-user-tag'
          })
          vm.resetForm()
          vm.$v.candidatesData.$reset()
        })
        .catch(error => {
          vm.$store.commit('auth/loading', false)
          vm.$q.notify({
            message: 'Something is wrong, Refresh your page',
            color: 'negative',
            timeout: 4000,
            position: 'bottom-right',
            icon: 'warning'
          })
          console.log(error)
        })
    }
  },
  created () {
    const vm = this
    this.$store.dispatch('contestant/getContestantAction', this.$route.params.eventId)
      .then(result => {
        if (result) {
        // if empty data
          vm.dataIsEmpty = true
        } else {
        // not
          vm.dataIsEmpty = false
        }
        vm.pageLoading = false
      })
  },
  components: {
    contestantsCreateForm: require('components/sharedContestants/createForm.vue').default,
    contentantsEmpty: require('components/emptyData/contestantsEmpty.vue').default,
    contestantList: require('components/sharedContestants/contestantLists').default
  }
}
</script>
