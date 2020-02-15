<template>
  <q-layout view="lHh Lpr lFf">
    <!-- <q-header elevated>
      <q-toolbar>

        <q-toolbar-title>
          Overview
        </q-toolbar-title>

        <div @click="signOut">Ckcm Tabulation v{{ $q.version }}</div>
      </q-toolbar>
    </q-header> -->

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="255"
        :breakpoint="400"
        dark
      >
        <q-scroll-area style="height: calc(100% - 205px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-item clickable class="q-py-lg bg-accent">
            <q-item-section avatar>
              <q-avatar color="indigo" rounded size="30px">
                <q-icon name="las la-calendar-check" size="30px" color="indigo-3"/>
              </q-avatar>
            </q-item-section>
            <q-item-section  style="margin-left:-15px" >
              <q-item-label lines="1" class="text-bold">Mr. & Ms. Intrams</q-item-label>
              <q-item-label class="text-green" caption>February 22nd, 2019</q-item-label>
            </q-item-section>
            <q-item-section side color="indigo">
              <q-icon name="las la-ellipsis-v" />
            </q-item-section>
            <q-menu
              anchor="bottom right" self="center left"
              transition-show="jump-down"
              transition-hide="jump-up"
              >
              <q-list>
                <q-item clickable>
                  <q-item-section>Having fun</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Crazy for transitions</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section>Mind blown</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-item>
          <q-list padding>
            <q-item v-for="(link, index) in linksAvail" :to="link.link" :key="index" clickable v-ripple>
              <q-item-section avatar >
                <q-icon :name="link.avatar" />
              </q-item-section>
              <q-item-section style="margin-left:-15px" >
                {{link.title}}
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top bg-dark" style="height: 150px;">
          <div class="absolute-bottom bg-dark text-center">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="/statics/jieIcons/apple-touch-icon-180x180.png">
            </q-avatar>
            <div class="text-weight-bolder text-h5">Tabulation System</div>
            <div class="text-bold">v{{ $q.version }}</div>
          </div>
        </q-img>

        <div class="absolute-bottom bg-dark" style="height: 55px">
          <q-separator></q-separator>
          <q-item  class="cursor-pointer bg-transparent">
            <q-item-section avatar>
              <q-avatar color="pink" size="35px">
                C
              </q-avatar>
            </q-item-section>
            <q-item-section  style="margin-left:-15px" >
              <q-item-label lines="1" class="text-subtitle1 text-bold">Ckcm Admin</q-item-label>
              <q-item-label class="text-white" caption>{{user.email}}</q-item-label>
            </q-item-section>
            <q-item-section side color="indigo">
              <q-icon name="las la-chevron-circle-down" />
            </q-item-section>
            <q-menu
              anchor="top right" self="bottom right"
              transition-show="jump-up"
              transition-hide="jump-down"
              >
              <q-list style="width:200px">
                <q-item clickable>
                  <q-item-section>Settings</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>System Info</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable @click="signOut">
                  <q-item-section>Logout</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-item>
        </div>

      </q-drawer>

    <q-page-container>
      <!-- <router-view /> -->
      <addEvent></addEvent>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {
    addEvent: require('components/addEvent').default
  },
  name: 'MainLayout',
  data () {
    return {
      drawer: false,
      linksAvail: [
        {
          title: 'Overview',
          avatar: 'lab la-dashcube',
          link: '/overview'
        },
        {
          title: 'Contestants',
          avatar: 'las la-user-tag',
          link: ''
        },
        {
          title: 'Criteria',
          avatar: 'las la-percentage',
          link: ''
        },
        {
          title: 'Score',
          avatar: 'las la-star-half-alt',
          link: ''
        },
        {
          title: 'Organizer',
          avatar: 'las la-universal-access',
          link: ''
        },
        {
          title: 'Reports',
          avatar: 'las la-stream',
          link: ''
        }
      ]
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  methods: {
    signOut () {
      this.$store.dispatch('auth/signOut')
    }
  }
}
</script>
