<template>
  <v-container>
    <v-row class="py-5">
      <v-col cols="12" md="9" lg="9">
        <h2 class="text-h5 font-weight-bold">
          {{ user.displayName }}
        </h2>
      </v-col>
      <v-col cols="12" md="3" lg="3">
        <v-autocomplete
          v-model="selectedSearch"
          label="Cari Pesanan"
          placeholder="Tulis untuk mencari"
          append-icon=""
          prepend-icon="mdi-magnify"
          :search-input.sync="search"
          :loading="isLoading"
          :items="itemsSearch"
          item-text="sender"
          item-value="id"
          return-object
          hide-no-data
          outlined
          solo
          dense
          flat
        />
      </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="orders"
      sort-by="calories"
      class="elevation-1"
    >
      <template #top>
        <v-dialog
          v-model="dialog"
          max-width="300px"
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
            <v-card-text>
              <div>
                <p class="mb-0 font-weight-bold">
                  Nama Pengirim
                </p>
                <p>{{ editedItem.sender }}</p>
              </div>
              <div>
                <p class="mb-0 font-weight-bold">
                  Nomor Telepon Pengirim
                </p>
                <p>{{ editedItem.phone }}</p>
              </div>
              <div>
                <p class="mb-0 font-weight-bold">
                  Tanggal Pengiriman
                </p>
                <p>{{ editedItem.dateOrder }}</p>
              </div>
              <div>
                <p class="mb-0 font-weight-bold">
                  Waktu
                </p>
                <p>{{ editedItem.timeOrder }}</p>
              </div>

              <hr class="my-5">

              <label for="waste-weight" class="font-weight-bold">Total Berat Sampah</label>
              <v-row class="mt-0 align-center">
                <v-col cols="8" md="4" lg="4">
                  <v-text-field
                    v-model="editedItem.wasteWeight"
                    name="waste-weight"
                    label="Berat Sampah"
                    outlined
                    hide-details="auto"
                    solo
                    flat
                    dense
                  />
                </v-col>
                <v-col cols="2">
                  <span class="font-weight-bold">
                    Kg
                  </span>
                </v-col>
              </v-row>

              <v-card-actions>
                <v-spacer />
                <div class="mx-0 px-0 mt-3">
                  <v-btn
                    color="red darken-1"
                    dark
                    @click="close"
                  >
                    Batal
                  </v-btn>
                  <v-btn
                    color="custom-primary"
                    dark
                    @click="save"
                  >
                    Simpan
                  </v-btn>
                </div>
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
                <v-col cols="3" class="d-flex align-center">
                  <v-icon class="text-h3" color="red lighten-1">
                    mdi-delete-alert-outline
                  </v-icon>
                </v-col>
                <v-col cols="9" class="text-left word-wrap">
                  <p class="mb-0 text-body-1 font-weight-bold">
                    Apakah anda yakin membuang data ini?
                  </p>
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

        <v-dialog
          v-model="dialogImage"
          max-width="400"
        >
          <CardImageGallery :images="editedItem.images" @onClick="dialogImage = false" />
        </v-dialog>
      </template>

      <template slot="item.wasteWeight" slot-scope="{ item }">
        <span v-if="!item.isConfirmed" color="amber lighten-1">Menunggu Penimbangan</span>
        <span v-else>{{ item.wasteWeight + ' Kg' }}</span>
      </template>

      <template slot="item.showImages" slot-scope="{ item }">
        <v-btn
          color="custom-primary"
          fab
          x-small
          dark
        >
          <v-icon
            @click="showImage(item)"
          >
            mdi-eye-outline
          </v-icon>
        </v-btn>
      </template>

      <template slot="item.actions" slot-scope="{ item }">
        <div v-if="item.isConfirmed">
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
        </div>
        <div v-else>
          <v-icon
            @click="editItem(item)"
          >
            mdi-weight-kilogram
          </v-icon>
        </div>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { getTime, talkDate } from '~/utils/date'

export default {
  middleware: ['auth-bank'],
  data () {
    return {
      headers: [
        {
          text: 'Delivery ID',
          value: 'id'
        },
        {
          text: 'Nama Pengirim',
          value: 'sender'
        },
        {
          text: 'Nomor Telepon',
          value: 'phone'
        },
        {
          text: 'Tanggal',
          value: 'dateOrder'
        },
        {
          text: 'Waktu',
          value: 'timeOrder'
        },
        {
          text: 'Foto',
          value: 'showImages'
        },
        {
          text: 'Berat',
          value: 'wasteWeight'
        },
        {
          text: 'Aksi',
          value: 'actions',
          sortable: false
        }
      ],
      orders: [],
      dialog: false,
      dialogDelete: false,
      dialogImage: false,
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
        sender: '',
        phone: '',
        dateOrder: '',
        timeOrder: '',
        wasteWeight: null,
        isConfirmed: true,
        images: []
      },
      defaultItem: {
        id: '',
        sender: '',
        phone: '',
        dateOrder: '',
        timeOrder: '',
        wasteWeight: null,
        isConfirmed: false,
        images: []
      },
      menu1: false,
      menu2: false
    }
  },
  computed: {
    formTitle () {
      return this.editedItem.isConfirmed ? 'Perbarui Berat Sampah' : 'Tambahkan Berat Sampah'
    },
    ...mapState('auth', {
      user: 'user'
    })
  },
  created () {
    this.initialize()
  },
  methods: {
    // ...mapActions('banks', {
    //   fetchBanks: 'fetchBanks'
    // }),
    async initialize () {
      const { data } = await this.$api.get('/delivers/bank')
      const orders = data.map((order) => {
        const { name, phone } = order.sender

        order.sender = name
        order.phone = phone

        const date = new Date(order.sendScheduleTime)

        order.dateOrder = talkDate(date)
        order.timeOrder = getTime(date)

        order.wasteWeight = order.wastes.reduce((t, c) => (t + c.wasteWeight), 0)
        order.images = [order.wasteImageUrl]

        order.isConfirmed = order.wasteWeight > 0

        return order
      })

      this.orders = orders
    },
    showImage (item) {
      this.editedIndex = this.orders.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogImage = true
    },
    editItem (item) {
      this.editedIndex = this.orders.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      this.editedIndex = this.orders.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () {
      // this.orders.splice(this.editedIndex, 1)
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
      const { id, wasteWeight } = this.editedItem
      await this.$api.put(`/delivers/${id}`, { status: 'Selesai', wasteWeight })

      // if (this.editedIndex > -1) {
      //   Object.assign(this.desserts[this.editedIndex], this.editedItem)
      // } else {
      //   this.desserts.push(this.editedItem)
      // }
      this.close()
    }
  }
}
</script>

<style>
.word-wrap {
  display: inline-block;
  word-wrap: break-word;
  word-break: break-word;
}
</style>
