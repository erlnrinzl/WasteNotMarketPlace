<template>
  <div>
    <UserGuide :guides="userGuideDeliver" />
    <div class="mt-2 mb-10 text-center">
      <v-btn class="custom-primary" dark to="/deliver-form">
        <span class="mx-4">Mulai Deliver</span>
        <v-icon>mdi-hand-coin-outline</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  // middleware: ['authenticated'],
  data () {
    return {
      userGuideDeliver: {
        name: 'Deliver',
        description: 'Layanan pengiriman barang ke drop point adalah sebuah layanan di mana anda dapat <strong>mengirim</strong> barang mereka ke <strong>lokasi dinas lingkungan</strong> yang diinginkan dengan waktu operasional yang telah ditetapkan. Anda dapat mengandalkan layanan ini untuk mengirim barang tanpa perlu menunggu di rumah atau kantor untuk menunggu waktu pick up.',
        steps: [
          'Mengisi Form Deliver',
          'Mengirimkan Sampah ke Dinas Lingkungan/Drop Point yang Dipilih Sesuai Jadwal',
          'Dinas Lingkungan Akan Menerima Sampah dan Melakukan Penimbangan',
          'Dinas Lingkungan Menampilkan Hasil Penimbangan Sampah Pada Detail Pesanan',
          'Poin Kamu Akan Ditambahkan Sesuai Dengan Berat Sampah Yang Kamu Kirimkan'
        ],
        thumbnail: 'Deliver.jpg'
      }
    }
  }
}

</script>
