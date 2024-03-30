<template>
  <div class="mt-3">
    <p class="mb-0 custom-secondary--text text-subtitle-1 font-weight-bold">
      {{ labelName }}
    </p>
    <span>{{ labelValue }}</span>
  </div>
</template>

<script>
export default {
  props: ['labelName', 'labelValue']
}
</script>
