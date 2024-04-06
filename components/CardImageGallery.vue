<template>
  <v-card>
    <v-img
      v-if="images.length > 0"
      height="200px"
      :src="require(`@/assets/images/${images[selectedImageIndex]}`)"
    />
    <v-card-title v-else>
      <span>No Image Available</span>
    </v-card-title>

    <div>
      <v-container>
        <p>Foto Sampah</p>
        <v-row v-if="images.length > 0">
          <v-col v-for="(image, index) in images" :key="index" cols="3">
            <v-img
              :src="require(`@/assets/images/${image}`)"
              @click="selectedImageIndex = index"
            />
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-card-actions>
      <v-spacer />
      <v-btn
        @click="$emit('onClick')"
      >
        Tutup
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      selectedImageIndex: 0
    }
  }
}
</script>
