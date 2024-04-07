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
              <v-col cols="2" md="1" lg="1">
                <span class="rounded-lg py-3 px-5 text-h6 custom-primary white--text">
                  {{ formNumber }}
                </span>
              </v-col>
              <v-col cols="10" md="11" lg="11">
                <span class="text-h6 white--text">Lengkapi Form Berikut</span>
              </v-col>
            </v-row>
          </v-container>
        </v-col>

        <v-col cols="12">
          <v-container>
            <v-row class="px-3">
              <v-col cols="12" md="5" lg="5">
                <label for="sender" class="white--text font-weight-bold">Nama Pengirim</label>
                <v-text-field
                  v-model="formData.sender"
                  :rules="formRules.sender"
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
                  :rules="formRules.phone"
                  name="phone"
                  label="Nomor Telepon Pengirim"
                  type="text"
                  class="mt-3"
                  outlined
                  solo
                >
                  <span
                    slot="prepend"
                    class="white--text text-body-1 font-weight-regular"
                  >
                    +62
                  </span>
                </v-text-field>
                <label for="address" class="white--text font-weight-bold">Alamat Penjemputan</label>
                <v-textarea
                  v-model="formData.address"
                  :rules="formRules.address"
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
              </v-col>
              <v-col cols="12" md="7" lg="7">
                <label for="evidence-image" class="white--text font-weight-bold">Foto Bukti Sampah</label>
                <v-file-input
                  v-model="image"
                  type="file"
                  name="evidence-image"
                  label="Foto Bukti Sampah"
                  prepend-icon="mdi-camera"
                  class="mt-3"
                  accept="image/*"
                  outlined
                  solo
                  @change="onFileChange"
                />
                <v-row v-if="image">
                  <v-col cols="4">
                    <v-img
                      :src="imageUrl"
                      width="200"
                      height="200"
                      contain
                    />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-col>

        <v-col cols="4" md="2" offset="4" offset-md="5" class="mb-10">
          <v-container>
            <v-btn class="custom-primary white--text" block @click="onSubmit">
              <span v-if="!isDisabled">
                Kirim
              </span>
              <v-progress-circular v-else color="custom-secondary" indeterminate />
            </v-btn>
          </v-container>
        </v-col>
      </v-row>
    </v-form>
  </v-responsive>
</template>

<script>
export default {
  middleware: ['authenticated'],
  data () {
    return {
      formName: 'Pick Up',
      formLabel: 'Pengambilan',
      formNumber: 1,
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      time: null,
      menu: false,
      menu2: false,
      formData: {
        sender: null
      },
      formRules: {
        sender: [
          v => !!v || 'Masukan nama lengkap anda!'
        ],
        phone: [
          v => !!v || 'Masukan nomor telepon anda!'
        ],
        address: [
          v => !!v || 'Masukan alamat anda!'
        ]
      },
      image: undefined,
      imageUrl: '',
      isDisabled: false
    }
  },
  methods: {
    onFileChange (file) {
      this.image = file
      this.imageUrl = ''
      if (!file) {
        return
      }
      this.previewImage(file)
    },
    previewImage (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.imageUrl = e.target.result
      }
      reader.readAsDataURL(file)
    },
    async onSubmit () {
      this.isDisabled = true

      try {
        const { sender, phone, address } = this.formData
        const phoneID = '+62' + phone

        const { date, time } = this
        const [hours, minutes] = time.split(':')

        const pickupSchedule = new Date(date)
        pickupSchedule.setHours(hours)
        pickupSchedule.setMinutes(minutes)

        const formData = new FormData()
        formData.append('wasteImage', this.image)
        formData.append('bankId', '')
        formData.append('requesterName', sender)
        formData.append('requesterPhone', phoneID) // +62xxx
        formData.append('requesterAddress', address)
        formData.append('pickupSchedule', pickupSchedule.toISOString())

        const { data } = await this.$api.post('/pickups', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        console.log(data)
        this.$router.go(-1)
      } catch (error) {
        console.log(error.response.data.message)
      } finally {
        this.isDisabled = false
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
