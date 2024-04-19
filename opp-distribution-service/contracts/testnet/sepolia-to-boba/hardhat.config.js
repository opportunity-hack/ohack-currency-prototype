/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config()
require("@nomiclabs/hardhat-ethers")

const { ALCHEMY_API_KEY, WALLET_PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: ALCHEMY_API_KEY,
      accounts: [`0x${WALLET_PRIVATE_KEY}`]
    }
  },
};
