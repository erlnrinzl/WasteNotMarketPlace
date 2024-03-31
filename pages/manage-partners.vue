<template>
  <v-container>
    <v-row class="py-5">
      <v-col cols="3">
        <h2 class="text-h5 font-weight-bold">
          Dinas Lingkungan
        </h2>
      </v-col>
      <v-col cols="2">
        <v-select
          v-model="sortBy"
          flat
          dense
          solo
          outlined
          hide-details
          :items="keys"
          label="Urutkan"
          append-icon="mdi-swap-vertical"
        />
      </v-col>

      <v-col cols="3" offset-md="2">
        <v-autocomplete
          v-model="selectedSearch"
          label="Cari Produk Daur Ulang"
          placeholder="Tulis untuk mencari"
          :search-input.sync="search"
          :loading="isLoading"
          :items="itemsSearch"
          item-text="title"
          item-value="id"
          return-object
          hide-no-data
          outlined
          solo
          dense
          flat
        />
      </v-col>
      <v-col cols="2">
        <v-btn color="custom-primary" dark @click="dialog = !dialog">
          <v-icon class="mr-2">
            mdi-plus
          </v-icon>
          Buat Baru
        </v-btn>
      </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="partners"
      sort-by="calories"
      class="elevation-1"
    >
      <template #top>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <v-card>
            <v-card-title>
              <v-icon class="mr-2" large>
                mdi-plus
              </v-icon>
              <span class="text-h5 font-weight-bold">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    class="py-0"
                  >
                    <label for="nama" class="text-h6 font-weight-bold">Nama</label>
                    <v-text-field
                      v-model="editedItem.name"
                      name="name"
                      label="Nama"
                      outlined
                      solo
                      flat
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    class="py-0"
                  >
                    <label for="alamat" class="text-h6 font-weight-bold">Alamat</label>
                    <v-textarea
                      v-model="editedItem.address"
                      name="Alamat"
                      label="Alamat"
                      rows="3"
                      outlined
                      solo
                      flat
                    />
                  </v-col>
                  <v-col
                    cols="6"
                    class="py-0"
                  >
                    <label for="openDay" class="text-h6 font-weight-bold">Hari Buka</label>
                    <v-select
                      v-model="editedItem.openDay"
                      flat
                      dense
                      solo
                      outlined
                      hide-details
                      color="custom-primary"
                      :items="dayKeys"
                      label="Hari Buka"
                      append-icon="mdi-calendar-multiselect-outline"
                    />
                  </v-col>
                  <v-col
                    cols="6"
                    class="py-0"
                  >
                    <label for="closeDay" class="text-h6 font-weight-bold">Hari Tutup</label>
                    <v-select
                      v-model="editedItem.closeDay"
                      color="custom-primary"
                      flat
                      dense
                      solo
                      outlined
                      hide-details
                      :items="dayKeys"
                      label="Hari Buka"
                      append-icon="mdi-calendar-multiselect-outline"
                    />
                  </v-col>
                  <v-col cols="12">
                    <hr class="mt-5">
                  </v-col>
                  <v-col
                    cols="6"
                  >
                    <label for="closeDay" class="text-h6 font-weight-bold">Jam Buka</label>
                    <v-menu
                      ref="menu1"
                      v-model="menu1"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="editedItem.openTime"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template #activator="{ on, attrs }">
                        <v-text-field
                          v-model="editedItem.openTime"
                          label="Jam Buka"
                          prepend-icon="mdi-clock-time-four-outline"
                          readonly
                          v-bind="attrs"
                          class="mt-3"
                          outlined
                          flat
                          solo
                          v-on="on"
                        />
                      </template>
                      <v-time-picker
                        v-if="menu1"
                        v-model="editedItem.openTime"
                        color="custom-primary"
                        full-width
                        @click:minute="$refs.menu1.save(editedItem.openTime)"
                      />
                    </v-menu>
                  </v-col>
                  <v-col
                    cols="6"
                  >
                    <label for="closeDay" class="text-h6 font-weight-bold">Jam Tutup</label>
                    <v-menu
                      ref="menu2"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="editedItem.closeTime"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template #activator="{ on, attrs }">
                        <v-text-field
                          v-model="editedItem.closeTime"
                          label="Jam Tutup"
                          prepend-icon="mdi-clock-time-four-outline"
                          readonly
                          v-bind="attrs"
                          class="mt-3"
                          outlined
                          solo
                          flat
                          v-on="on"
                        />
                      </template>
                      <v-time-picker
                        v-if="menu2"
                        v-model="editedItem.closeTime"
                        color="custom-primary"
                        full-width
                        @click:minute="$refs.menu2.save(editedItem.closeTime)"
                      />
                    </v-menu>
                  </v-col>
                </v-row>
              </v-container>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card-text>
          </v-card>
        </v-dialog>

        <v-dialog
          v-model="dialogDelete"
          max-width="400"
        >
          <v-card class="py-5">
            <v-card-title>
              <v-row>
                <v-col cols="2" class="d-flex align-center">
                  <v-icon class="text-h3" color="red lighten-1">
                    mdi-delete-alert-outline
                  </v-icon>
                </v-col>
                <v-col cols="10" class="text-left">
                  Apakah anda yakin membuang data ini?
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text>
              <span class="font-weight-bold">Nama:</span>
              <span>{{ editedItem.name }}</span>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="red lighten-1"
                dark
                @click="deleteItemConfirm"
              >
                Buang
              </v-btn>
              <v-btn
                @click="closeDelete"
              >
                Batal
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>

      <template slot="item.actions" slot-scope="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      headers: [
        {
          text: 'Aksi',
          value: 'actions',
          sortable: false
        },
        {
          text: 'ID',
          value: 'id'
        },
        {
          text: 'Nama',
          value: 'name'
        },
        {
          text: 'Alamat',
          value: 'address'
        },
        {
          text: 'Jam Buka',
          value: 'openTime'
        },
        {
          text: 'Jam Tutup',
          value: 'closeTime'
        },
        {
          text: 'Hari Buka',
          value: 'openDay'
        },
        {
          text: 'Hari Tutup',
          value: 'closeDay'
        }
      ],
      partners: [],
      dialog: true,
      dialogDelete: false,
      sortBy: 'name',
      keys: [
        'Name',
        'Price',
        'Date Added'
      ],
      dayKeys: [
        'Minggu',
        'Senin',
        'Selasa',
        'Rabu',
        'Kamis',
        'Jumat',
        'Sabtu',
        'Minggu'
      ],
      search: null,
      isLoading: false,
      itemsSearch: [],
      selectedSearch: null,
      selectedDelete: 'lampu sendok',
      editedIndex: -1,
      editedItem: {
        id: '',
        name: '',
        address: '',
        openTime: '',
        closeTime: '',
        openDay: '',
        closeDay: ''
      },
      defaultItem: {
        id: '',
        name: '',
        address: '',
        openTime: '',
        closeTime: '',
        openDay: '',
        closeDay: ''
      },
      menu1: false,
      menu2: false
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Tambah Dinas Lingkungan' : 'Perbarui Dinas Lingkungan'
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.partners = [
        {
          id: '103948109234',
          name: 'Bank Sampah Teratai',
          address: 'Jl. Terusan Gaharu 1 No.2 4, RT.9/RW.11, Cilandak Bar., Kec. Cilandak, Kota Jakarta Selatan,  12430',
          openTime: '09:00',
          closeTime: '18.00',
          openDay: 'Senin',
          closeDay: 'Minggu'
        }
      ]
    },
    editItem (item) {
      this.editedIndex = this.partners.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      this.editedIndex = this.partners.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () {
      // this.partners.splice(this.editedIndex, 1)
      // API Call delete
      this.closeDelete()
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>
