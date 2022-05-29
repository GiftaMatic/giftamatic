/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require("@nomiclabs/hardhat-ethers");
 module.exports = {
   solidity: "0.8.11",
   networks: {
     hardhat: {},
       polygon_mumbai: {
         url: 'https://polygon-mumbai.g.alchemy.com/v2/PS9lCedwL3xhHFMRASM-cPDr16vD79Z3', // YOUR_ALCHEMY_MUMBAI_URL
         accounts: [`0x399a8174ff6efb89b3fd90ebe0e7a760a6acda6f9ffa8dd5b23d685adcac45b2`], // YOUR_TEST_WALLET_PRIVATE_KEY,
       },
     },
 };