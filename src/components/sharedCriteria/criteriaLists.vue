<template>
  <div>
    <q-table hide-bottom :data="listofCategories" :columns="columns" row-key="name">
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
    </q-table>
  </div>
</template>

<script>
import { fireDB } from "boot/firebase";
import filter from "lodash/filter";
export default {
  data() {
    return {
      columns: [
        {
          name: "index",
          align: "left",
          label: "#",
          sortable: true
        },
        {
          name: "name",
          required: true,
          label: "Category",
          align: "center",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "score",
          align: "center",
          label: "Posibble score",
          sortable: true
        },
        {
          name: "keyIndex",
          align: "center",
          label: "Action"
        }
      ]
    };
  },
  methods: {
    deleteBtn(data) {
      let vm = this;
      this.$q
        .dialog({
          title: "Confirm",
          message: `<span class="text-negative text-bold text-capitalize">${data.name}</span> will be permanently removed in the category`,
          cancel: true,
          persistent: true,
          html: true
        })
        .onOk(() => {
          fireDB
            .collection("Owner/CKCM/Categories/")
            .doc(data.keyIndex)
            .delete();
        })
        .onOk(() => {
          vm.$q.notify({
            message: data.name + " successfully deleted category ",
            timeout: 4000,
            position: "bottom-right",
            icon: "las la-user-tag"
          });
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    }
  },
  computed: {
    listofCategories() {
      let data = filter(
        this.$store.state.category.listofCategories,
        "keyIndex"
      );

      data.forEach((row, index) => {
        row.index = index;
      });
      return data;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>