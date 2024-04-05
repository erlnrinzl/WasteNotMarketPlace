<template>
  <v-card outlined>
    <v-card-title class="font-weight-bold">
      {{ mapsObject.name }}
    </v-card-title>
    <v-card-text>
      <div>
        <v-icon>mdi-map-marker</v-icon>
        <span>{{ mapsObject.distance + ' Km' }}</span>
        <span>
          <router-link
            to="mapsObject.mapsUrl"
            style="cursor: pointer"
            class="text-decoration-none"
          >
            Buka Map
          </router-link>
        </span>
      </div>
      <p class="my-2 text-caption">
        {{ mapsObject.address }}
      </p>
      <div class="my-2 text-caption">
        <v-icon class="mr-2 custom-primary--text">
          mdi-calendar-multiselect-outline
        </v-icon>
        <span class="font-weight-black">{{ mapsObject.schedule.day }}</span>
      </div>
      <div class="my-2 text-caption">
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
