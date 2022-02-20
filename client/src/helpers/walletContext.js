import { ethers } from "ethers";
import { ref } from "vue";
import { ethereum, provider, throwNewErr } from "../utils/constants";

export const walletContext = () => {
  let balance = ref(0);

  const getBalance = async () => {
    try {
      if (!ethereum) return alert("please install metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      let value = await provider.getBalance(accounts[0]);
      balance.value = Number(ethers.utils.formatEther(value));
    } catch (error) {
      throwNewErr(error);
    }
  };

  return {
    balance,
    getBalance,
  };
};
