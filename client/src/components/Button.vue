<script setup>
import Loader from "./Loader.vue";
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  className: {
    type: String,
    default: "w-full text-center cursor-pointer rounded-full",
  },
  onClick: {
    type: Function,
    default: () => {},
  },
  content: {
    type: String,
    default: "Mint",
  },
});
</script>

<template>
  <div v-if="isLoading">
    <Loader />
  </div>
  <div
    v-else
    :class="[
      className,
      { 'cur-wait': isLoading, 'opacity-50 cursor-not-allowed': isDisabled },
    ]"
    @click="!isDisabled && !isLoading && onClick()"
  >
    {{ isLoading ? "" : content }}
  </div>
</template>
