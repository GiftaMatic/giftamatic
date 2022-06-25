import abi from '../abi/GiftToken.json'
import { giftTokenContractAddress, NETWORK_ID } from '../config'
import Web3 from "web3"
import { AbiItem } from 'web3-utils'

const contractAddress = giftTokenContractAddress

const getGFTBalance = async (address: string) => {
  if (!window || !window.ethereum) {
    return '0'
  }
  const web3 = new Web3(window.ethereum)
  const networkId = await web3.eth.net.getId()
  if (networkId.toString() !== NETWORK_ID) {
    return '0'
  }

  const contract = new web3.eth.Contract(<AbiItem>(abi.abi as any), contractAddress)
  const amount = await contract.methods.balanceOf(address).call()
  return amount
}

export { getGFTBalance }