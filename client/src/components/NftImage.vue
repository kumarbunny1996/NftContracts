<script setup>
import { ref } from "@vue/reactivity";
import { watch, watchEffect } from "@vue/runtime-core";
import { ethers } from "ethers";
import { nftTokenContract } from "../utils/constants";
import { setCurrentAccount } from "../helpers/appContext";
import Button from "./Button.vue";

const contentId = import.meta.env.VITE_APP_PINATA_CID;
const mint = "Mint";
const show = "show uri"
const isMinted = ref(false);
const props = defineProps({
  getCount: {
    type: Function,
    default: () => {},
  },
  tokenId: {
    type: Number,
    default: 0,
  },
});
const metadataURI = `${contentId}/${props.tokenId}.json`;
const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${props.tokenId}.png`;
const placeholderURI =
  "https://gateway.pinata.cloud/ipfs/QmTBxFm3SU3pmWQgGzb2ApZe9oMD6amZCAkyVa6HyvMDxB/placeholder.png";

const getMintedStatus = async () => {
  isMinted.value = await nftTokenContract.isCountedOwn(metadataURI);
  console.log(isMinted.value, nftTokenContract);
};

const mintToken = async () => {
  let parsedAmount = ethers.utils.parseEther("0.002");
  let {currentAccount} = await setCurrentAccount();
  console.log(parsedAmount);

  await ethereum.request({
    method: "eth_sendTransaction",
    params: [
      {
        from: currentAccount.value,
        to: nftTokenContract.address,
        gas: "0x5208",
        value: parsedAmount._hex,
      },
    ],
  });
  const result = await nftTokenContract.payTomint(
    nftTokenContract.address,
    metadataURI,
    {value:parsedAmount}
  );
  await result.wait();
  getMintedStatus();
  props.getCount();
};

const getTokenUri = async () => {
  let uri = await nftTokenContract.tokenURI(props.tokenId);
  alert(uri);
};

let btnprops = {
   //content: isMinted.value ? "Show Uri" : "MINT",
  className:
    "text-center cursor-pointer rounded-sm text-white bg-blue-700 p-4 text-lg hover:bg-white hover:text-blue-700",
};

watchEffect(() => {
  getMintedStatus();
});
</script>

<template>
  <div class="">
    <img
      class="w-24 h-14 object-cover"
      :src="[isMinted ? imageURI : placeholderURI]"
      alt="png-img"
    />
    <div class="flex flex-col justify-center items-center py-3">
      <h5 class="text-white text-base my-2">ID #{{ tokenId }}</h5>
      <Button v-bind="btnprops" :onClick="isMinted ? getTokenUri: mintToken" :content="isMinted ? show : mint" />
    </div>
  </div>
</template>
