<template>
  <v-dialog
    :value="showDialog"
    max-width="290"
  >
    <v-card>
      <v-card-title :class="color">
        <v-container>
          <div class="text-center">
            <v-icon class="text-h1 white--text">
              {{ icon }}
            </v-icon>
          </div>
          <div class="text-center">
            <p class="text-h6 white--text">
              {{ title }}
            </p>
          </div>
        </v-container>
      </v-card-title>
      <v-card-text class="py-2">
        <div class="text-center">
          {{ message }}
        </div>
      </v-card-text>
      <v-card-actions class="pb-3 justify-center">
        <v-btn
          color="custom-primary"
          small
          dark
          @click="closeDialog"
        >
          Tutup
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'mdi-check'
    },
    color: {
      type: String,
      default: 'custom-secondary'
    }
  },
  computed: {
    showDialog () {
      return this.show
    }
  },
  methods: {
    closeDialog () {
      this.$emit('close')
    }
  }
}
</script>
