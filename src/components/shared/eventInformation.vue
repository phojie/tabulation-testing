<template>
  <q-card class="q-pa-md">
    <q-card-section horizontal>
      <q-card-section class="col-3">
        <div class="text-subtitle2">
          Event information
        </div>
      </q-card-section>
      <q-card-section class="col-9">
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <label>Event Id</label>
            <q-input
              class="q-mt-sm"
              stack-label
              outlined
              dense=""
              @input="setTitle($event)"
              disable
              :value="eventUpdateForm.keyIndex"
            />
          </div>
          <div class="col-12">
            <label>Title</label>
            <q-input
              class="q-mt-sm"
              stack-label
              outlined
              dense=""
              :value="eventUpdateForm.eventTitle"
              @input="setTitle($event)"
              :error="validations.eventTitle.$error"
            >
              <template
                v-slot:error
                v-if="!validations.eventTitle.required"
              >
                Event title is required
              </template>
            </q-input>
          </div>
          <div class="col-12">
            <label>Schedule</label>
            <q-input
              class="q-mt-sm"
              stack-label
              outlined
              dense=""
              :value="eventUpdateForm.schedule"
              @input="setSchedule($event)"
              mask="date"
              label="Schedule"
              :error="validations.schedule.$error"
            >
              <template
                v-slot:error
                v-if="!validations.schedule.required"
              >
                Schedule is required
              </template>
              <template v-slot:append>
                <q-icon
                  name="event"
                  class="cursor-pointer"
                >
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="eventUpdateForm.schedule"
                      @input="setSchedule($event),$refs.qDateProxy.hide()"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-12 ">
            <div class="row q-col-gutter-md">
              <slot name="btnChanges"></slot>
            </div>
          </div>
        </div>
        <q-inner-loading :showing="loading">
          <q-spinner-pie
            size="50px"
            color="primary"
          />
        </q-inner-loading>
      </q-card-section>
    </q-card-section>
    <q-separator spaced></q-separator>
    <q-card-section horizontal>
      <q-card-section class="col-3">
        <div class="text-subtitle2">
          Delete event
        </div>
      </q-card-section>
      <q-card-section class="col-9">
        <div>
          <slot name="btnDelete"></slot>
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: ['eventUpdateForm', 'validations'],
  computed: {
    loading () {
      return this.$store.state.auth.loading
    }
  },
  methods: {
    setTitle (data) {
      this.$emit('update:eventTitle', data)
      this.validations.eventTitle.$touch()
    },
    setSchedule (data) {
      this.$emit('update:schedule', data)
      this.validations.schedule.$touch()
    }
  }
}
</script>
