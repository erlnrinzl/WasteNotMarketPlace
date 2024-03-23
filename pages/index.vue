<template>
  <v-container>
    <v-card>
      <v-card-title>Kamu sudah mengumpulkan sampah sebanyak:</v-card-title>
      <span>{{ totalWasteCollected }}</span>
      <span>KG</span>
      <hr >
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      totalWasteCollected: 14
    }
  }
}
</script>
