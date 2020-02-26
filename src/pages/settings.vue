<template>
  <q-page
    padding
    class="q-pa-md-xl"
  >
    <div class="text-h4">Details</div>
    <div class="q-mt-md">
      <eventInformation
        :eventUpdateForm="eventUpdateForm"
        :eventTitle.sync="eventUpdateForm.eventTitle"
        :schedule.sync="eventUpdateForm.schedule"
        :validations="$v.eventUpdateForm"
      >
        <template v-slot:btnChanges>
          <div>
            <q-btn
              no-caps
              color="primary"
              label="Save changes"
              @click="validateInfo()"
            ></q-btn>
          </div>
          <div>
            <q-btn
              no-caps
              class="rounded-borders"
              label="Discard changes"
              @click="sendToForm()"
            ></q-btn>
          </div>
        </template>
        <template v-slot:btnDelete>
          <q-btn
            label="Delete"
            no-caps
            color="negative"
            @click="deleteDialogForm = true, confirmInput =''"
          ></q-btn>
        </template>
      </eventInformation>
    </div>
    <q-dialog
      content-style="background-color:#3f51b559"
      v-model="deleteDialogForm"
    >
      <dialogForm :eventUpdateForm="idEventData">
        <template v-slot:confirmInput>
          <q-input
            autofocus=""
            outlined
            dense=""
            v-model="confirmInput"
            class="q-mt-md col-md-7 col-md-xs-12"
            :placeholder="eventUpdateForm.eventTitle"
          />
        </template>
        <template v-slot:btnType>
          <q-btn
            flat
            no-caps
            class="q-px-sm"
            @click="deleteDialogForm = false"
          >Cancel</q-btn>
          <q-btn
            :disable="confirmCorrect"
            no-caps
            :class="[{'bg-grey-4 text-grey-9': confirmCorrect}, 'bg-negative text-white']"
            class="q-px-sm rounded-borders no-box-shadow"
            @click="deleteEvent"
          >Delete</q-btn>
        </template>
      </dialogForm>
    </q-dialog>
  </q-page>
</template>

<script>
import find from 'lodash/find'
import { required } from 'vuelidate/lib/validators'
export default {
  validations: {
    eventUpdateForm: {
      eventTitle: { required },
      schedule: { required }
    }
  },
  data () {
    return {
      deleteDialogForm: false,
      confirmInput: '',
      eventUpdateForm: {
        eventTitle: '',
        schedule: '',
        keyIndex: ''
      }
    }
  },
  components: {
    eventInformation: require('components/shared/eventInformation').default,
    dialogForm: require('components/shared/dialogForm.vue').default
  },
  methods: {
    validateInfo () {
      if (this.$v.eventUpdateForm.$invalid) {
        this.$v.eventUpdateForm.$touch()
      } else {
        this.saveChanges()
      }
    },
    saveChanges () {
      const vm = this
      this.$store.commit('auth/loading', true)
      this.$store.dispatch('event/updateEventAction', this.eventUpdateForm)
        .then(result => {
          this.$store.commit('auth/loading', false)
          vm.$q.notify({
            message: result.eventTitle + ' Event Successfully Updated ',
            color: 'primary',
            timeout: 4000,
            position: 'bottom-right',
            icon: 'las la-calendar-check'
          })
        })
    },
    sendToForm () {
      const myData = find(this.$store.state.event.listOfEVENTS, ['keyIndex', this.$route.params.eventId])
      if (myData) {
        this.eventUpdateForm = {
          keyIndex: myData.keyIndex,
          eventTitle: myData.eventTitle,
          schedule: myData.schedule
        }
      } else {
      }
    },
    deleteEvent () {
      const vm = this
      this.$store.commit('auth/loading', true)
      this.$store.dispatch('event/deleteEventAction', this.idEventData)
        .then(result => {
          vm.$q.notify({
            message: result.eventTitle + ' Event Successfully Deleted ',
            timeout: 4000,
            position: 'bottom-right',
            icon: 'las la-trash-alt'
          })
          vm.$store.commit('auth/loading', true)
          vm.deleteDialogForm = false
          vm.$router.replace({ name: 'dashboard' })
        })
        .catch(error => {
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
  computed: {
    idEventData () {
      const myData = find(this.$store.state.event.listOfEVENTS, ['keyIndex', this.$route.params.eventId])
      return myData
    },
    confirmCorrect () {
      if (this.idEventData.eventTitle !== this.confirmInput) {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    this.sendToForm()
  }
}
</script>

<style lang="scss" scoped>
</style>
