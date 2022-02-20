<script setup>
import { computed, ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
import { nftTokenContract } from "../utils/constants";
import NftImage from "./NftImage.vue";

let nftCount = ref(0);
const getCount = async () => {
  let value = await nftTokenContract.count();
  nftCount.value = parseInt(value);
  console.log(nftCount.value);
};

const nftTotalCount = computed(() => {
  return Array(parseInt(nftCount.value) + 1)
    .fill(0)
    .map((_, index) => index);
});

watchEffect(() => {
  getCount();
});
</script>

<template>
  <h1 class="text-3xl text-white text-gradient text-center mb-2">
    Nfts Collections
  </h1>
  <div class="flex flex-col md:flex-row mt-4 p-4 justify-center items-center">
    <NftImage
      v-for="(count, index) in nftTotalCount"
      :key="index"
      :tokenId="count"
      :getCount="getCount"
    />
  </div>
</template>
