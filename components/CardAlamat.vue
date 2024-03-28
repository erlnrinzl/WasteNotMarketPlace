<template>
  <v-card outlined>
    <v-card-title class="font-weight-bold">
      {{ mapsObject.name }}
    </v-card-title>
    <v-card-text>
      <div class="my-1">
        <v-icon>mdi-map-marker</v-icon>
        <span>{{ mapsObject.distance + ' Km' }}</span>
        <span>
          <a :href="mapsObject.mapsUrl">Buka Map</a>
        </span>
      </div>
      <p class="my-2 font-weight-regular">
        {{ mapsObject.address }}
      </p>
      <div class="my-1">
        <v-icon class="mr-2 custom-primary--text">
          mdi-calendar-multiselect-outline
        </v-icon>
        <span class="font-weight-black">{{ mapsObject.schedule.day }}</span>
      </div>
      <div class="my-1">
        <v-icon class="mr-2 custom-primary--text">
          mdi-clock-outline
        </v-icon>
        <span class="font-weight-black">{{ mapsObject.schedule.time }}</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    mapsObject: {
      type: Object,
      required: true
    }
  }
}
</script>
