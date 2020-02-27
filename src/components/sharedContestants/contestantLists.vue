<template>
  <div class="col-md-6 col-xs-12">
    <q-card flat class="bg-indigo-1">
      <q-toolbar>
        <q-toolbar-title class="text-capitalize">{{listDetails.name}}</q-toolbar-title>
        <q-btn
          class="text-indigo bg-indigo-1"
          square
          flat
          round
          size="sm"
          icon="las la-external-link-alt"
          no-caps
          @click="$emit('viewBtn', listDetails)"
        >
          <q-tooltip>View</q-tooltip>
        </q-btn>
      </q-toolbar>
      <q-card-section class="row q-col-gutter-sm">
        <div class="col-md-6 col-sm-6 col-xs-12">
          <q-img
            :src="listDetails.male.profileimg"
            class="rounded-borders"
            :ratio="1"
            spinner-color="primary"
          >
            <div class="absolute-bottom text-caption text-weight-bolder cursor-pointer ellipsis">
              Mr. {{listDetails.male.fullname}}
              <q-tooltip>Mr. {{listDetails.male.fullname}}</q-tooltip>
            </div>
          </q-img>

          <q-card-section>
            <span class="text-h6 text-indigo-9">❝</span>
            <span class="text-caption text-justify">{{listDetails.male.quotes}}</span>
          </q-card-section>
        </div>

        <div class="col-md-6 col-sm-6 col-xs-12">
          <q-img
            spinner-color="primary"
            :src="listDetails.female.profileimg"
            class="rounded-borders"
            :ratio="1"
          >
            <div class="absolute-bottom text-caption text-weight-bolder cursor-pointer ellipsis">
              Ms. {{listDetails.female.fullname}}
              <q-tooltip>Ms. {{listDetails.female.fullname}}</q-tooltip>
            </div>
          </q-img>

          <q-card-section>
            <span class="text-h6 text-indigo-9">❝</span>
            <span class="text-caption text-justify">{{listDetails.female.quotes}}</span>
          </q-card-section>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import filter from "lodash/filter";
export default {
  props: ["listDetails"]
};
</script>