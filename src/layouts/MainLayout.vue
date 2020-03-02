<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <div class="text-weight-bolder text-h5">
            <q-btn flat @click="drawer = !drawer" round dense>
              <q-icon v-if="drawer" name="keyboard_arrow_left"></q-icon>
              <q-icon v-else name="keyboard_arrow_right"></q-icon>
            </q-btn>
            <span v-if="!drawer">
              <q-avatar size="32px">
                <img src="/statics/jieIcons/apple-touch-icon-180x180.png" />
              </q-avatar>
              Tabulation System v{{ $q.version }}
            </span>
          </div>
        </q-toolbar-title>

        <div>
          <q-chip
            square
            color="white"
            text-color="primary"
            class="text-weight-bold"
            style="letter-spacing:1px"
            icon="event_note"
          >{{eventChoose.eventTitle}}</q-chip>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above :width="260" dark>
      <q-scroll-area
        style="height: calc(100% - 260px); margin-top: 150px; border-right: 1px solid #ddd"
      >
        <q-separator class="bg-accent" style="height:1px"></q-separator>
        <q-item clickable class="q-py-lg">
          <q-item-section avatar>
            <q-avatar color="indigo" rounded size="30px">
              <q-icon name="las la-calendar-check" size="30px" color="indigo-3" />
            </q-avatar>
          </q-item-section>
          <q-item-section style="margin-left:-15px">
            <q-item-label lines="1" class="text-bold text-uppercase">{{eventChoose.eventTitle}}</q-item-label>
            <q-item-label class="text-green" caption>{{dateConvert(eventChoose.schedule)}}</q-item-label>
          </q-item-section>
          <q-item-section side color="indigo">
            <q-icon name="las la-ellipsis-v" />
          </q-item-section>
          <q-menu
            anchor="bottom right"
            self="center left"
            transition-show="jump-down"
            transition-hide="jump-up"
            square
            content-class="shadow-23"
          >
            <q-list>
              <q-item-label
                header
                class="bg-primary text-white text-weight-bolder"
              >List of Events Available</q-item-label>
              <q-separator></q-separator>
              <div style="max-height:200px" class="overflow-auto scrollbar-primary">
                <q-item
                  v-for="(data,index) in listOfEVENTS"
                  :key="index"
                  :to="{ name: 'eventDash', params: { eventId: data.keyIndex }}"
                  exact
                  active-class="borderActive bg-indigo-1 text-primary"
                  v-ripple
                >
                  <q-item-section>
                    <q-item-label class="text-bold">{{data.eventTitle}}</q-item-label>
                    <q-item-label class="text-caption">{{data.schedule}}</q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </q-list>
          </q-menu>
        </q-item>
        <q-separator class="bg-accent" style="height:1px"></q-separator>
        <q-list padding>
          <q-item
            exact
            active-class="borderNavActive bg-accent text-white"
            v-for="(link, index) in linksAvail"
            :to="{name: link.link}"
            :key="index"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-icon :name="link.avatar" />
            </q-item-section>
            <q-item-section style="margin-left:-15px">{{link.title}}</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top bg-dark" style="height: 150px;">
        <div class="absolute-bottom bg-dark text-center">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="/statics/jieIcons/apple-touch-icon-180x180.png" />
          </q-avatar>
          <div class="text-weight-bolder text-h5">Tabulation System</div>
          <div class="text-bold">v{{ $q.version }}</div>
        </div>
      </q-img>

      <div class="absolute-bottom bg-dark" style="height: 110px">
        <q-separator></q-separator>
        <q-item class="cursor-pointer bg-transparent q-py-md">
          <q-item-section avatar>
            <q-avatar color="teal" size="35px" class="text-weight-bolder">C</q-avatar>
          </q-item-section>
          <q-item-section style="margin-left:-15px">
            <q-item-label lines="1" class="text-subtitle1 text-bold">Ckcm Admin</q-item-label>
            <q-item-label class="text-white" caption>{{user.email}}</q-item-label>
          </q-item-section>
          <q-item-section side color="indigo">
            <q-icon name="las la-chevron-circle-down" />
          </q-item-section>
          <q-menu
            anchor="top right"
            self="bottom right"
            transition-show="jump-up"
            transition-hide="jump-down"
          >
            <q-list style="width:200px">
              <q-item :to="{name: 'dashboard'}" exact>
                <q-item-section>See All Projects</q-item-section>
              </q-item>
              <q-item :to="{name: 'eventSettings'}" exact>
                <q-item-section>Settings</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable @click="signOut">
                <q-item-section>Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-item>
        <q-separator></q-separator>
        <div class="row q-px-md q-py-sm fit">
          <div class="col text-caption cursor-pointer">Feedback</div>
          <div class="col text-caption cursor-pointer">Support</div>
          <div class="text-caption cursor-pointer">Ckcm 2020</div>
        </div>
      </div>
    </q-drawer>

    <q-page-container v-if="loadedBa">
      <addEvent v-if="listOfEVENTS.length === 0"></addEvent>
      <router-view v-else />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from "vuex";
import filter from "lodash/filter";
import find from "lodash/find";
import { date } from "quasar";
export default {
  components: {
    addEvent: require("components/addEvent").default
  },
  name: "MainLayout",
  data() {
    return {
      loading: true,
      loadedBa: false,
      drawer: false,
      linksAvail: [
        // {
        //   title: "Overview",
        //   avatar: "lab la-dashcube",
        //   link: "eventDash"
        // },
        {
          title: "Contestants",
          avatar: "las la-user-tag",
          link: "contestants"
        },
        {
          title: "Judges",
          avatar: "las la-gavel",
          link: "judges"
        },
        {
          title: "Criteria",
          avatar: "las la-percentage",
          link: "criteria"
        },

        // {
        //   title: "Organizer",
        //   avatar: "las la-universal-access",
        //   link: "organizer"
        // },
        {
          title: "Score",
          avatar: "las la-star-half-alt",
          link: "score"
        },
        {
          title: "Reports",
          avatar: "las la-stream",
          link: "reports"
        }
      ]
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
    listOfEVENTS() {
      const data = filter(this.$store.state.event.listOfEVENTS, "keyIndex");
      return data;
    },
    eventChoose() {
      const myData = find(this.listOfEVENTS, [
        "keyIndex",
        this.$route.params.eventId
      ]);
      if (myData) {
        return myData;
      } else {
        return "";
      }
    }
  },
  methods: {
    dateConvert(schedule) {
      const newDate = date.formatDate(schedule, "MMMM DD, YYYY");
      return newDate;
    },
    signOut() {
      this.$store.dispatch("auth/signOut");
    },
    getEvent() {
      const vm = this;
      this.$q.loadingBar.start();
      this.$q.loading.show();
      this.$store
        .dispatch("event/getEventAction")
        .then(result => {
          vm.loadedBa = true;
          this.$q.loading.hide();
          this.$q.loadingBar.stop();
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.getEvent();
  }
};
</script>

<style scoped>
.borderActive {
  border-left: 5px solid #3f51b5 !important;
}
.borderNavActive {
  border-left: 4px solid #3f51b5 !important;
}
</style>
