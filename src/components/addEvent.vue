<template>
  <q-page padding class="flex flex-center">
    <q-card flat class="text-blue-grey-9" >
      <q-card-section>
          <div class="text-h3 text-bold q-mb-lg"> Oooopps! </div>
          <div class="text-h6"> Looks like you ddn't enter an Event yet, Phojie</div>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn @click="prompt = true" icon="las la-calendar-plus" glossy color="primary" class="text-right" no-caps>
          Create Event
        </q-btn>
      </q-card-actions>
    </q-card>

    <q-dialog v-model="prompt" persistent>
      <eventForm
        :eventForm="eventForm"
        :title.sync="eventForm.title"
        :schedule.sync="eventForm.schedule"
        :validations="$v.eventForm"
      >
        <template v-slot:headerTitle>
          <div class="text-h6">Event Info</div>
        </template>
        <template v-slot:btnType>
          <q-btn flat label="Add Event" @click="validateInfo" />
        </template>
      </eventForm>
    </q-dialog>
  </q-page>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import capitalize from 'lodash/capitalize'
export default {
  validations: {
    eventForm: {
      title: { required },
      schedule: { required }
    }
  },
  components: {
    eventForm: require('components/shared/eventForm.vue').default
  },
  data () {
    return {
      prompt: false,
      eventForm: {
        title: '',
        schedule: ''
      }
    }
  },
  methods: {
    validateInfo () {
      if (this.$v.eventForm.$invalid) {
        this.$v.eventForm.$touch()
      } else {
        this.addEvent()
      }
    },
    addEvent () {
      const vm = this
      this.$store.commit('auth/loading', true)
      this.$store.dispatch('event/addEventAction', this.eventForm)
        .then(result => {
          vm.$store.commit('auth/loading', false)
          vm.resetEventForm()
          vm.$v.eventForm.$reset()
          vm.$q.notify({
            message: capitalize(result.title) + ' Event Successfully Added ',
            color: 'positive',
            timeout: 2000,
            position: 'top',
            icon: 'note_add'
          })
          vm.$q.loadingBar.stop()
        })
        .catch(error => {
          vm.$q.notify({
            message: 'Something is wrong, Refresh your page',
            color: 'negative',
            timeout: 500,
            position: 'top',
            icon: 'note_add'
          })
          console.log(error)
        })
    },
    resetEventForm () {
      this.eventForm = {
        title: '',
        schedule: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
