const bs58 = require("bs58");

const getBytes32FromIpfsHash = (ipfsCID) => {
  return `0x${bs58.decode(ipfsCID).slice(2).toString("hex")}`;
}

const getIpfsHashFromBytes32 = (bytes32Hash) => {
  let hashHex = `1220${bytes32Hash.slice(2)}`;
  let hashBytes = Buffer.from(hashHex, "hex");
  let hashStr = bs58.encode(hashBytes);
  return hashStr;
}

module.exports = {
  getBytes32FromIpfsHash,
  getIpfsHashFromBytes32,
};