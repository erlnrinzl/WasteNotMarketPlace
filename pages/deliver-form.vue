<template>
  <v-responsive class="custom-secondary">
    <v-form>
      <v-row class="custom-secondary">
        <v-col cols="12">
          <v-container class="my-5">
            <div class="text-center">
              <h4 class="text-h4 font-weight-bold white--text">
                {{ 'Form ' + formName }}
              </h4>
            </div>
          </v-container>
        </v-col>

        <v-col cols="12">
          <v-container>
            <v-row class="align-center">
              <v-col cols="2" sm="2" md="1" lg="1">
                <span class="rounded-lg py-3 px-5 text-h6 custom-primary white--text">
                  {{ 1 }}
                </span>
              </v-col>
              <v-col cols="10" sm="10" md="4" lg="4">
                <span class="text-h6 white--text">Pilih Dinas Lingkungan</span>
              </v-col>
              <v-col cols="12" sm="12" md="4" lg="4">
                <v-autocomplete
                  v-model="selectedSearch"
                  label="Cari Dinas Lingkungan"
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
                />
              </v-col>
              <v-col cols="12" sm="6" md="4" lg="4">
                <CardAlamat :maps-object="mapsObject" />
              </v-col>
            </v-row>
          </v-container>
        </v-col>

        <v-col cols="12">
          <v-container>
            <v-row class="align-center">
              <v-col cols="2" sm="2" md="1" lg="1">
                <span class="rounded-lg py-3 px-5 text-h6 custom-primary white--text">
                  {{ 2 }}
                </span>
              </v-col>
              <v-col cols="10" sm="10" md="11" lg="11">
                <span class="text-h6 white--text">Lengkapi Form Berikut</span>
              </v-col>
            </v-row>
          </v-container>
        </v-col>

        <v-col cols="12" sm="12" md="5" class="px-10">
          <v-container>
            <label for="sender" class="white--text font-weight-bold">Nama Pengirim</label>
            <v-text-field
              v-model="formData.sender"
              name="sender"
              label="Nama Pengirim"
              type="text"
              class="mt-3"
              outlined
              solo
            />
            <label for="phone" class="white--text font-weight-bold">Nomor Telepon Pengirim</label>
            <v-text-field
              v-model="formData.phone"
              name="phone"
              label="Nomor Telepon Pengirim"
              type="text"
              class="mt-3"
              outlined
              solo
            />
            <label for="address" class="white--text font-weight-bold">Alamat Penjemputan</label>
            <v-textarea
              v-model="formData.address"
              name="address"
              label="Alamat Penjemputan"
              class="mt-3"
              rows="3"
              outlined
              solo
            />
            <label for="date" class="white--text font-weight-bold">{{ 'Tanggal ' + formLabel }}</label>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="Tanggal Pengambilan"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  class="mt-3"
                  outlined
                  solo
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="date"
                color="custom-primary"
                no-title
                scrollable
              >
                <v-spacer />
                <v-btn
                  text
                  color="custom-primary"
                  @click="menu = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="custom-primary"
                  @click="$refs.menu.save(date)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>

            <label for="date" class="white--text font-weight-bold">{{ 'Waktu ' + formLabel }}</label>
            <v-menu
              ref="menu"
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="time"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="time"
                  label="Waktu Pengambilan"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  class="mt-3"
                  outlined
                  solo
                  v-on="on"
                />
              </template>
              <v-time-picker
                v-if="menu2"
                v-model="time"
                color="custom-primary"
                full-width
                @click:minute="$refs.menu.save(time)"
              />
            </v-menu>
          </v-container>
        </v-col>
        <v-col cols="12" sm="12" md="7" class="px-10">
          <v-container>
            <label for="evidence-image" class="white--text font-weight-bold">Foto Bukti Sampah</label>
            <v-file-input
              v-model="selectedFile"
              name="evidence-image"
              label="Foto Bukti Sampah"
              prepend-icon="mdi-camera"
              class="mt-3"
              accept="image/*"
              outlined
              solo
              @change="onFileChange"
            />
            <v-img
              v-if="imageUrl"
              :src="imageUrl"
              width="200"
              height="200"
              contain
            />
          </v-container>
        </v-col>

        <v-col cols="12" md="2" offset-md="5" class="mb-10">
          <v-container>
            <v-btn class="custom-primary white--text" block>
              <span>
                Kirim
              </span>
            </v-btn>
          </v-container>
        </v-col>
      </v-row>
    </v-form>
  </v-responsive>
</template>

<script>
export default {
  // middleware: ['authenticated'],
  data () {
    return {
      formName: 'Deliver',
      formLabel: 'Pengiriman',
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      time: null,
      menu: false,
      menu2: false,
      formData: {
        sender: null
      },
      selectedFile: null,
      imageUrl: '',
      search: null,
      isLoading: false,
      itemsSearch: [],
      selectedSearch: null,
      mapsObject: {
        name: 'Dinas Lingkungan Hidup Cilandak',
        distance: 4.5,
        mapsUrl: '',
        address: 'Jl. Terusan Gaharu 1 No.2 4, RT.9/RW.11, Cilandak Bar., Kec. Cilandak, Kota Jakarta Selatan,  12430',
        schedule: {
          day: 'Senin - Sabtu',
          time: '07.00 - 17.00'
        }
      }
    }
  },
  methods: {
    onFileChange (event) {
      this.selectedFile = event.target.files[0]
      this.previewImage()
    },
    previewImage () {
      const reader = new FileReader()
      reader.readAsDataURL(this.selectedFile)
      reader.onload = (e) => {
        this.imageUrl = e.target.result
      }
    }
  }
}
</script>

<style>
.v-input__icon.v-input__icon--prepend .v-icon {
  color: white;
}

</style>
