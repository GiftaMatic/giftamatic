import { BigNumber } from "ethers";
// import BigNumber from 'bignumber.js'
import Web3 from "web3"
import { AbiItem } from 'web3-utils'
import abi from '../abi/Gift.json'
import giftAbi from '../abi/Gift.json'
import ERC721Abi from '../abi/ERC721.json'
import { alchemyUrl, NETWORK_ID, smartContractAddress } from "../config"

const contractAddress = smartContractAddress

const buyNftFromContract = async (nftIndex: number, donorAddress: string, price: string) => {
  const web3 = new Web3(window.ethereum);

  const contract = new web3.eth.Contract(<AbiItem>(abi.abi as any), contractAddress)
  if (donorAddress !== '')
    return await contract.methods.buyNFT(nftIndex).send({ from: donorAddress, value: web3.utils.toWei(price.toString(), 'ether') })
  return null
}

const getNFTs = async () => {
  const web3 = new Web3(window.ethereum);

  const contract = new web3.eth.Contract(<AbiItem>(abi.abi as any), contractAddress)
  return await contract.methods.getNftGifts().call()
}

const giftNFT = async (nftContractAddress: string, tokenid: string, price: string, campaignCreator: string, campaignIndex: string, donorAddress: string) => {
  const web3 = new Web3(window.ethereum);

  const contract = new web3.eth.Contract(<AbiItem>(giftAbi.abi as any), contractAddress)
  if (donorAddress !== '')
    return await contract.methods.donateNFT(nftContractAddress, parseInt(tokenid), web3.utils.toWei(price, 'ether'), campaignCreator, parseInt(campaignIndex)).send({ from: donorAddress })
  return;
}

const approveNFT = async (address: string, tokenId: string, self: string) => {
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(<AbiItem>(ERC721Abi as any), address)
  if (self !== '')
    return await contract.methods.approve(contractAddress, tokenId).send({ from: self })
  return {}
}

const fetchNFT = async (address: string, id: string) => {
  const web3 = new Web3(window.ethereum);

  const contract = new web3.eth.Contract(<AbiItem>(abi.abi as any), contractAddress)
  if (address !== '')
    return await contract.methods.getNFTMetadata(address, id).call()
  return {}
}

const fetchAllCampaigns = async (address: string) => {
  const web3 = new Web3(window.ethereum);

  const contract = new web3.eth.Contract(<AbiItem>(abi.abi as any), contractAddress)
  if (address !== '')
    return await contract.methods.getCampaignsByCreator(address).call()
  return []
}

const fetchCampaign = async (address: string, id: string) => {
  const web3 = new Web3(alchemyUrl);
  const contract = new web3.eth.Contract(<AbiItem>(giftAbi.abi as any), contractAddress)
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

  const contract = new web3.eth.Contract(<AbiItem>(giftAbi.abi as any), contractAddress)
  if (address !== '')
    return await contract.methods.getCampaign(address, parseInt(id)).call()
  return null
}

const createCampaign = async (account: string, targetAmount: string, cid: string) => {
  const web3 = new Web3(window.ethereum);

  const contract = new web3.eth.Contract(<AbiItem>(abi.abi as any), contractAddress)
  return await contract.methods.createCampaign(cid, web3.utils.toWei(targetAmount, 'ether')).send({ from: account })
}

const giftMatic = async (address: string, id: string, donorAddress: string, donationAmount: number) => {
  const web3 = new Web3(window.ethereum);

  const contract = new web3.eth.Contract(<AbiItem>(giftAbi.abi as any), contractAddress)

  if (address !== '')
    return await contract.methods.gift(address, parseInt(id)).send({ from: donorAddress, value: web3.utils.toWei(donationAmount.toString(), 'ether') })
  return null
}

export { buyNftFromContract, getNFTs, giftNFT, approveNFT, fetchNFT, fetchAllCampaigns, fetchCampaign, fetchCampaignById, giftMatic, createCampaign }
