<template>
  <div>
    <UserGuide :guides="userGuidePickup" />
    <div class="mt-2 mb-10 text-center">
      <v-btn class="custom-primary" dark to="/pickup-form">
        <span class="mx-4">Mulai Pick Up</span>
        <v-icon>mdi-dolly</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  // middleware: ['authenticated'],
  data () {
    return {
      userGuidePickup: {
        name: 'Pick Up',
        description: 'Layanan pickup adalah sebuah layanan di mana kamu dapat memilih jadwal yang tersedia untuk <strong>pengambilan</strong> barang-barang yang sudah tidak terpakai atau bekas di rumah anda. <strong>Tim dinas lingkungan</strong> akan datang ke rumah kamu sesuai dengan jadwal yang telah dipilih, dan mengambil barang-barang yang ingin didaur ulang',
        steps: [
          'Mengisi Form Pick Up',
          'Menunggu Dinas Lingkungan Mengambil Sampah',
          'Dinas Lingkungan Mengambil Sampah dan Melakukan Penimbangan',
          'Dinas Lingkungan Menampilkan Hasil Penimbangan Sampah Pada Detail Pesanan',
          'Poin Kamu Akan Ditambahkan Sesuai Dengan Berat Sampah Yang Kamu Kirimkan'
        ],
        thumbnail: 'Pick Up.png'
      }
    }
  }
}

</script>
