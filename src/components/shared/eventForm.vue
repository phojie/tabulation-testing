<template>
  <q-card style="min-width: 450px">
    <q-card-section class="bg-primary text-white">
      <slot name="headerTitle"></slot>
    </q-card-section>

    <q-card-section class="q-pt-none q-gutter-y-md">
      <q-input class="text-capitalize" :value="eventForm.title" @input="setTitle($event)" label="Title" autofocus :error="validations.title.$error">
        <template v-slot:error v-if="!validations.title.required">
          Event title is required
        </template>
      </q-input>
      <q-input :value="eventForm.schedule" @input="setSchedule($event)" mask="date" label="Schedule" :error="validations.schedule.$error">
        <template v-slot:error v-if="!validations.schedule.required">
          Schedule is required
        </template>
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
              <q-date v-model="eventForm.schedule" @input="setSchedule($event),$refs.qDateProxy.hide()" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </q-card-section>

    <q-card-actions align="right" class="text-primary">
      <q-btn flat label="Cancel" v-close-popup />
      <slot name="btnType"></slot>
    </q-card-actions>

    <q-inner-loading :showing="loading">
      <q-spinner-gears
        size="50px"
        color="primary"
      />
    </q-inner-loading>
  </q-card>
</template>

<script>
export default {
  props: ['eventForm', 'validations'],
  computed: {
    loading () {
      return this.$store.state.auth.loading
    }
  },
  methods: {
    setTitle (data) {
      this.$emit('update:title', data)
      this.validations.title.$touch()
    },
    setSchedule (data) {
      this.$emit('update:schedule', data)
      this.validations.schedule.$touch()
    }
  }
}
</script>
