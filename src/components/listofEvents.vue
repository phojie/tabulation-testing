<template>
  <div class="row q-col-gutter-md q-mt-md">
    <div class="col-md-3 col-xs-12" style="height:250px">
      <q-btn
        class="fit bg-white q-pa-xl text-primary shadow-2"
        no-caps
        stack
        @click="prompt = true"
        style="border-radius:5px"
      >
        <q-icon name="add" size="30px" color="primary"></q-icon>
        <div class="q-mt-md text-weight-bold">Add Event</div>
      </q-btn>
    </div>
    <div
      class="col-md-3 col-xs-12"
      v-for="event in eventsList"
      :key="event.keyIndex"
      style="height:250px;"
    >
      <q-btn
        :to="{ name: 'eventDash', params: { eventId: event.keyIndex } }"
        class="column fit bg-white q-pa-xl shadow-2"
        no-caps
        style="border-radius:10px"
        stack
      >
        <div class="text-h5 text-weight-bold text-grey-9">{{ event.eventTitle }}</div>
        <br />
        <div class="text-indigo-5">
          <q-icon name="las la-calendar-check"></q-icon>
          {{ dateConvert(event.schedule) }}
        </div>
      </q-btn>
    </div>

    <!-- dialog -->

    <q-dialog content-style="background-color:#3f51b559" v-model="prompt" persistent>
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
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import capitalize from "lodash/capitalize";
import { date } from "quasar";
export default {
  validations: {
    eventForm: {
      title: { required },
      schedule: { required }
    }
  },
  computed: {
    eventsList() {
      return this.$store.state.event.listOfEVENTS;
    }
  },
  components: {
    eventForm: require("components/shared/eventForm.vue").default
  },
  data() {
    return {
      prompt: false,
      eventForm: {
        title: "",
        schedule: ""
      }
    };
  },
  methods: {
    dateConvert(schedule) {
      const newDate = date.formatDate(schedule, "MMMM DD, YYYY");
      return newDate;
    },
    validateInfo() {
      if (this.$v.eventForm.$invalid) {
        this.$v.eventForm.$touch();
      } else {
        this.addEvent();
      }
    },
    addEvent() {
      const vm = this;
      this.$store.commit("auth/loading", true);
      this.$store
        .dispatch("event/addEventAction", this.eventForm)
        .then(result => {
          vm.$store.commit("auth/loading", false);
          vm.resetEventForm();
          vm.$v.eventForm.$reset();
          vm.prompt = false;
          vm.$q.notify({
            message: capitalize(result.title) + " Event Successfully Added ",
            color: "positive",
            timeout: 2000,
            position: "top-right",
            icon: "las la-calendar-check"
          });
        })
        .catch(error => {
          vm.$q.notify({
            message: "Something is wrong, Refresh your page",
            color: "negative",
            timeout: 500,
            position: "top-right",
            icon: "warning"
          });
          console.log(error);
        });
    },
    resetEventForm() {
      this.eventForm = {
        title: "",
        schedule: ""
      };
    }
  }
};
</script>
