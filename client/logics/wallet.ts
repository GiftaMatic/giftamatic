import { BigNumber, ethers } from 'ethers'
import Web3 from 'web3'

const connectWallet = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  let response = await provider.send('eth_requestAccounts', [])
  if (response && response.length > 0)
    return response[0]
  else {
    return ''
  }
}

const listenToNetworkChange = async (onChange: Function) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  return provider.on('networkChanged', (networkId) => {
    onChange(networkId)
  });
}

const getMaticBalance = async () => {
  const web3 = new Web3(window.ethereum)

  const accounts = await web3.eth.getAccounts()
  if (accounts && accounts.length > 0) {
    var balance = await web3.eth.getBalance(accounts[0]);
    return BigNumber.from(balance)
  } else {
    return BigNumber.from(0)
  }
}

const addMaticNetworkToMetamask = () => {
  window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [{
      chainId: '0x13881',
      rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
      chainName: "Matic Testnet",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18
      },
      blockExplorerUrls: ["https://polygonscan.com/"]
    }]
  })
}

const fetchAccountAddress = async () => {
  if(!window || !window.ethereum) {
    return ''
  }
  const web3 = new Web3(window.ethereum)
  const accounts = await web3.eth.getAccounts()
  if (accounts && accounts.length > 0) {
    return accounts[0]
  }
  return ''
}

export { connectWallet, fetchAccountAddress, listenToNetworkChange, getMaticBalance, addMaticNetworkToMetamask }