const GiftToken = artifacts.require("GiftToken.sol")
const Gift = artifacts.require("Gift.sol")

module.exports = async function (deployer) {

  await deployer.deploy(GiftToken)

  const giftToken = await GiftToken.deployed()

  await deployer.deploy(Gift, giftToken.address)

  const gift = await Gift.deployed()

  await giftToken.transferOwner(gift.address)
  console.log("GiftaMatic is now deployed to:", gift.address, "GFT token is now deployed to:", giftToken.address)
};