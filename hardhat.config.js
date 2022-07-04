/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-ethers");

const config = require('./config')
const PRIVATE_KEY = config.PRIVATE_KEY

module.exports = {
  solidity: "0.8.11",
  networks: {
    hardhat: {},
    polygon_mumbai: {
      url: 'https://rpc-mumbai.maticvigil.com', // YOUR_ALCHEMY_MUMBAI_URL
      accounts: [PRIVATE_KEY], // YOUR_TEST_WALLET_PRIVATE_KEY,
    },
  },
};