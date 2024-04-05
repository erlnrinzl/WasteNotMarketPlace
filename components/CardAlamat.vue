<template>
  <v-card
    :width="width"
    :max-height="290"
    :color="active ? 'primary' : 'grey lighten-1'"
    outlined
    @click="$emit('click')"
  >
    <v-card-title class="font-weight-bold">
      <span class="">
        {{ bank.name }}
      </span>
    </v-card-title>
    <v-card-text>
      <div>
        <v-icon>mdi-map-marker</v-icon>
        <span>{{ bank.distance + ' Km' }}</span>
        <span>
          <router-link
            :to="bank.mapsUrl"
            style="cursor: pointer"
            class="text-decoration-none"
          >
            Buka Map
          </router-link>
        </span>
      </div>
      <p class="my-2 text-caption overflow-hidden">
        {{ bank.address }}
      </p>
      <div class="my-2 text-caption">
        <v-icon class="mr-2 custom-primary--text">
          mdi-calendar-multiselect-outline
        </v-icon>
        <span class="font-weight-black">{{ bank.schedule.day }}</span>
      </div>
      <div class="my-2 text-caption">
        <v-icon class="mr-2 custom-primary--text">
          mdi-clock-outline
        </v-icon>
        <span class="font-weight-black">{{ bank.schedule.time }}</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    bank: {
      type: Object,
      required: true
    },
    width: {
      type: Number,
      default: 250
    },
    color: {
      type: String,
      default: ''
    },
    click: {
      type: Function,
      default: function () {}
    },
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>
