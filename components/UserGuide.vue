<template>
  <v-row>
    <v-col cols="12" class="custom-primary">
      <v-container class="mt-10">
        <div class="text-center">
          <h3 class="text-h3 font-weight-bold white--text">
            {{ guides.name }}
          </h3>
        </div>
        <v-row class="my-5 justify-center">
          <v-col md="3">
            <v-img :src="require(`@/assets/images/${guides.thumbnail}`)" />
          </v-col>
        </v-row>
        <div class="my-5 px-4 text-center guide-description">
          <p class="white--text" v-html="guides.description" />
        </div>
      </v-container>
    </v-col>
    <v-col cols="12">
      <v-container>
        <div class="my-5 text-center">
          <h3 class="text-h3 font-weight-bold custom-secondary--text">
            Langkah-Langkah {{ guides.name }}
          </h3>
        </div>
        <div class="px-7 mt-10">
          <v-row v-for="(step, index) in guides.steps" :key="index" class="my-10 align-center">
            <v-col cols="2">
              <span class="rounded-lg py-3 px-5 text-h6 custom-primary white--text">
                {{ index + 1 }}
              </span>
            </v-col>
            <v-col cols="10" class="pl-5">
              <span class="text-h6 custom-secondary--text">
                {{ step }}
              </span>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    guides: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
.guide-description {
  font-size: 1.5rem;
  font-weight: 300;
}

.guide-description strong {
  font-weight: 700;
}

</style>
