import { BigNumber } from "ethers";
// import BigNumber from 'bignumber.js'
import Web3 from "web3"
import { AbiItem } from 'web3-utils'
import abi from '../abi/Gift.json'
import giftAbi from '../abi/Gift.json'
import { alchemyUrl, NETWORK_ID } from "../config";

const fetchAllCampaigns = async (address: string) => {
  const web3 = new Web3(window.ethereum);

  const contract = new web3.eth.Contract(<AbiItem>(abi.abi as any), abi.networks[NETWORK_ID].address)
  if (address !== '')
    return await contract.methods.getCampaignsByCreator(address).call()
  return []
}

const fetchCampaign = async (address: string, id: string) => {
  const web3 = new Web3(alchemyUrl);
  const contract = new web3.eth.Contract(<AbiItem>(giftAbi.abi as any), abi.networks[NETWORK_ID].address)
  if (address !== '')
    return await contract.methods.getCampaign(address, parseInt(id)).call()
  return null
}

const fetchCampaignById = async (address: string, id: string) => {
  let web3
  if (window && window.ethereum !== undefined && window.ethereum.networkVersion === NETWORK_ID) {
    web3 = new Web3(window.ethereum)
  } else {
    web3 = new Web3(alchemyUrl)
  }

  const contract = new web3.eth.Contract(<AbiItem>(giftAbi.abi as any), abi.networks[NETWORK_ID].address)
  if (address !== '')
    return await contract.methods.getCampaign(address, parseInt(id)).call()
  return null
}

const createCampaign = async (account: string, title: string, description: string, targetAmount: string, imageURL: string, associatedURL: string) => {
  const web3 = new Web3(window.ethereum);

  const contract = new web3.eth.Contract(<AbiItem>(abi.abi as any), abi.networks[NETWORK_ID].address)
  return await contract.methods.createCampaign(title, description, web3.utils.toWei(targetAmount, 'ether'), imageURL, associatedURL).send({ from: account })
}

const giftMatic = async (address: string, id: string, donorAddress: string, donationAmount: number) => {
  const web3 = new Web3(window.ethereum);

  const contract = new web3.eth.Contract(<AbiItem>(giftAbi.abi as any), abi.networks[NETWORK_ID].address)

  if (address !== '')
    return await contract.methods.gift(address, parseInt(id)).send({ from: donorAddress, value: web3.utils.toWei(donationAmount.toString(), 'ether') })
  return null
}

export { fetchAllCampaigns, fetchCampaign, fetchCampaignById, giftMatic, createCampaign }
