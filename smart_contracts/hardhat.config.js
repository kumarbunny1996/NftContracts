require("@nomiclabs/hardhat-waffle");
require("dotenv/config");

let { ALCHEMY_PRIVATE_KEY, ROPSTEN_PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: ALCHEMY_PRIVATE_KEY,
      accounts:[ROPSTEN_PRIVATE_KEY],
    }
  }
};
