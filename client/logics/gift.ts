import Web3 from "web3"
import { AbiItem } from 'web3-utils'
import abi from '../abi/Gift.json'
import { NETWORK_ID } from "../config";

const fetchAllCampaigns = async (address: string) => {
  const web3 = new Web3(window.ethereum);

  const contract = new web3.eth.Contract(<AbiItem>(abi.abi as any), abi.networks[NETWORK_ID].address)
  if (address !== '')
    return await contract.methods.getCampaignsByCreator(address).call()
  return []
}

export { fetchAllCampaigns }
