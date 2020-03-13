<template>
  <div class="col-md-4 col-sm-6 col-xs-12">
    <q-card>
      <q-toolbar class="bg-indigo text-white">
        <q-toolbar-title class="text-weight-bold text-body1 text-capitalize">{{listData.name}}</q-toolbar-title>
      </q-toolbar>
      <q-card-section>
        <div class="text-overline">Criteria</div>
        <q-list class="scrollbar-primary" style="height:200px; overflow:auto">
          <q-item v-for="(listCriteria,index) in listData.criteriaList" :key="index">
            <q-item-section avatar>
              <q-avatar color="indigo" text-color="white">
                <span class="text-caption">{{listCriteria.rating}}%</span>
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-capitalize">{{listCriteria.name}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn
          flat
          round
          icon="las la-trash"
          @click="$emit('deleteBtn',listData)"
          text-color="negative"
        />
        <q-btn
          size="sm"
          @click="$emit('upddateBtn',Object.freeze({name: listData.name,keyIndex: listData.keyIndex, criteriaList: listData.criteriaList }))"
          color="primary"
          no-caps
        >Edit Criteria</q-btn>
      </q-card-actions>
    </q-card>
    <!-- <q-table hide-bottom :data="listofCategories" :columns="columns" row-key="name">
      <template v-slot:body="props">
        <q-tr :props="props" class="text-capitalize">
          <q-td key="index" :props="props">{{props.row.index + 1}}.</q-td>
          <q-td key="name" :props="props">{{props.row.name}}</q-td>
          <q-td key="score" :props="props">{{props.row.score}} %</q-td>
          <q-td key="keyIndex" :props="props">
            <q-btn
              flat
              label="Delete"
              @click="deleteBtn(props.row)"
              no-caps
              dense
              class="text-caption"
            >
              <q-tooltip>Delete</q-tooltip>
            </q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>-->
  </div>
</template>

<script>
import { fireDB } from "boot/firebase";
import filter from "lodash/filter";
export default {
  props: ["listData"],

  methods: {}
};
</script>

<style lang="scss" scoped>
</style>