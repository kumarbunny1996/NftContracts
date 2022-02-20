import { ethers } from "ethers";
import abi from "./nftToken.json";

export const contractAbi = abi.abi;
export const contractAddress = "0xAC8F4B0f78F5E0dE2c968f72E3342F9a3847Fe95";
export const ethereum = window.ethereum;
export const provider = new ethers.providers.Web3Provider(ethereum);
export const signer = provider.getSigner();
export const nftTokenContract = new ethers.Contract(
  contractAddress,
  contractAbi,
  signer
);
export const throwNewErr = (error) => {
  console.error(error);
  throw new error("No ethereum address is found");
};
