<script setup>
import Nfts from "./components/Nfts.vue";
import WalletBalance from "./components/WalletBalance.vue";
import { walletContext } from "./helpers/walletContext";
import { appContext } from "./helpers/appContext";

let { balance, getBalance } = walletContext();

let walletProps = {
  getBalance,
};
appContext();
</script>

<template>
  <WalletBalance :balance="balance" v-bind="walletProps" />
  <Nfts />
</template>
