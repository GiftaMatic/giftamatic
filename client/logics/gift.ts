import { BigNumber } from "ethers";
// import BigNumber from 'bignumber.js'
import Web3 from "web3"
import { AbiItem } from 'web3-utils'
import abi from '../abi/Gift.json'
import giftAbi from '../abi/Gift.json'
import { NETWORK_ID } from "../config";

const fetchAllCampaigns = async (address: string) => {
  const web3 = new Web3(window.ethereum);

  const contract = new web3.eth.Contract(<AbiItem>(abi.abi as any), abi.networks[NETWORK_ID].address)
  if (address !== '')
    return await contract.methods.getCampaignsByCreator(address).call()
  return []
}

const fetchCampaignById = async (address: string, id: string) => {
  const web3 = new Web3(window.ethereum);

  const contract = new web3.eth.Contract(<AbiItem>(giftAbi.abi as any), abi.networks[NETWORK_ID].address)
  if (address !== '')
    return await contract.methods.getCampaign(address, parseInt(id)).call()
  return null
}

const giftMatic = async (address: string, id: string, donorAddress: string, donationAmount: number) => {
  const web3 = new Web3(window.ethereum);

  const contract = new web3.eth.Contract(<AbiItem>(giftAbi.abi as any), abi.networks[NETWORK_ID].address)
  console.log(donationAmount, typeof donationAmount, address, donorAddress, id)
  if (address !== '')
    return await contract.methods.gift(address, parseInt(id)).send({ from: donorAddress, value: Web3.utils.toWei(new (BigNumber.from(donationAmount) as any), 'ether') }).call()
  return null
}

export { fetchAllCampaigns, fetchCampaignById, giftMatic }
