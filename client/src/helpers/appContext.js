import { ethereum, throwNewErr } from "../utils/constants";
import { ref, watchEffect } from "vue";

export const setCurrentAccount = async () => {
  const currentAccount = ref("");
  const accounts = await ethereum.request({ method: "eth_accounts" });
  // console.log(accounts);
  if (accounts.length) {
    currentAccount.value = accounts[0];
    // console.log(currentAccount.value);
  }
  return {
    currentAccount,
  };
};
export const appContext = () => {
  const checkIfWalletIsConnectedOrNot = async () => {
    try {
      if (!ethereum) return alert("please install metamask");
      await setCurrentAccount();
    } catch (error) {
      throwNewErr(error);
    }
  };

  watchEffect(() => {
    checkIfWalletIsConnectedOrNot();
  });
};
