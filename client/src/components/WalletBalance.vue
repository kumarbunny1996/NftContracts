<script setup>
import Button from "./Button.vue";
const props = defineProps({
  balance: {
    type: Number,
    default: 0,
  },
  getBalance: {
    type: Function,
    default: () => {},
  },
});
let btnprops = {
  content:"Show my balance",
  className:"w-48 text-center cursor-pointer rounded-full text-white bg-blue-700 py-4 text-lg hover:bg-white hover:text-blue-700",
}
</script>

<template>
  <div class="w-full flex justify-center items-center flex-col md:flex-row py-3 md:my-0 my-2">
    <h1 class="text-3xl text-red-500 mr-5">Wallet Balance:{{ balance }}</h1>
    <Button v-bind="btnprops" :onClick="getBalance" class="" />
  </div>
</template>
