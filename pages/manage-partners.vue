<template>
  <v-container>
    <v-row class="py-5">
      <v-col cols="12" md="7" lg="7">
        <h2 class="text-h5 font-weight-bold">
          Dinas Lingkungan
        </h2>
      </v-col>
      <v-col cols="12" md="3" lg="3" class="py-0">
        <v-autocomplete
          v-model="selectedSearch"
          label="Cari Produk Daur Ulang"
          placeholder="Tulis untuk mencari"
          append-icon=""
          prepend-icon="mdi-magnify"
          :search-input.sync="search"
          :loading="isLoading"
          :items="itemsSearch"
          item-text="title"
          item-value="id"
          hide-no-data
          return-object
          outlined
          solo
          dense
          flat
        />
      </v-col>
      <v-col cols="2" class="pt-0">
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
      :items="banks"
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
              <v-row class="align-center">
                <v-col cols="2">
                  <v-icon v-if="editedIndex === -1" class="mr-2 custom-primary--text" large>
                    mdi-plus
                  </v-icon>
                  <v-icon v-else class="mr-2 custom-primary--text" large>
                    mdi-square-edit-outline
                  </v-icon>
                </v-col>
                <v-col cols="10" class="word-wrap">
                  <span class="text-h5 custom-primary--text font-weight-bold">{{ formTitle }}</span>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text class="py-0">
              <div>
                <label for="nama" class="text-body-1 font-weight-bold">Nama</label>
                <v-text-field
                  v-model="editedItem.name"
                  name="name"
                  label="Nama"
                  outlined
                  dense
                  solo
                  flat
                />
              </div>
              <div>
                <label for="phone" class="text-body-1 font-weight-bold">Telepon</label>
                <v-text-field
                  v-model="editedItem.phone"
                  name="phone"
                  label="Telepon"
                  outlined
                  dense
                  solo
                  flat
                />
              </div>
              <div>
                <label for="email" class="text-body-1 font-weight-bold">Email</label>
                <v-text-field
                  v-model="editedItem.email"
                  name="email"
                  label="Email"
                  outlined
                  dense
                  solo
                  flat
                />
              </div>
              <div>
                <label for="alamat" class="text-body-1 font-weight-bold">Alamat</label>
                <v-textarea
                  v-model="editedItem.address"
                  name="Alamat"
                  label="Alamat"
                  rows="3"
                  outlined
                  solo
                  flat
                />
              </div>
            </v-card-text>

            <v-card-actions class="pb-4">
              <v-spacer />
              <v-btn
                color="red darken-1"
                dark
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="custom-primary"
                dark
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
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
  // middleware: ['auth-admin'],
  data () {
    return {
      headers: [
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
          text: 'Telepon',
          value: 'phone'
        },
        {
          text: 'Email',
          value: 'email'
        },
        {
          text: 'Aksi',
          value: 'actions',
          sortable: false
        }
      ],
      banks: [],
      dialog: true,
      dialogDelete: false,
      search: null,
      isLoading: false,
      itemsSearch: [],
      selectedSearch: null,
      selectedDelete: '',
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
      menu2: false,
      dummyBank: []
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Tambah Dinas Lingkungan' : 'Perbarui Dinas Lingkungan'
    }
  },
  async mounted () {
    const { data } = await this.$api.get('/banks')
    this.dummyBank = data
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.banks = [
        {
          id: '103948109234',
          name: 'Bank Sampah Teratai',
          address: 'Jl. Terusan Gaharu 1 No.2 4, RT.9/RW.11, Cilandak Bar., Kec. Cilandak, Kota Jakarta Selatan,  12430',
          closeDates: [
            '2024-04-15',
            '2024-04-30'
          ],
          openSchedules: [
            {
              dayOfWeek: '1',
              scheduleTimeClose: '17:00',
              scheduleTimeOpen: '08:00'
            },
            {
              dayOfWeek: '2',
              scheduleTimeClose: '17:00',
              scheduleTimeOpen: '08:00'
            }
          ]
        }
      ]
    },
    editItem (item) {
      this.editedIndex = this.banks.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      this.editedIndex = this.banks.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () {
      // this.banks.splice(this.editedIndex, 1)
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
    async save () {
      if (this.editedIndex > -1) {
        // axios to post updated bank data to server
        const { name, address, id } = this.editedItem

        const closeDates = []
        const openSchedules = []
        const geoPoint = {
          latitude: 0,
          logitude: 0
        }

        const formData = new FormData()
        formData.append('name', name)
        formData.append('address', address)
        formData.append('closeDates', closeDates)
        formData.append('openSchedules', openSchedules)
        formData.append('geoPoint', geoPoint)

        const { data } = await this.$api.put(`/banks/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        console.log(data)

        Object.assign(this.banks[this.editedIndex], this.editedItem)
      } else {
        // axios to post new bank data to server
        const { name, address } = this.editedItem

        const closeDates = []
        const openSchedules = []
        const geoPoint = {
          latitude: 0,
          logitude: 0
        }

        const formData = new FormData()
        formData.append('name', name)
        formData.append('address', address)
        formData.append('closeDates', closeDates)
        formData.append('openSchedules', openSchedules)
        formData.append('geoPoint', geoPoint)

        const { data } = await this.$api.post('/banks', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        console.log(data)

        this.banks.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>
