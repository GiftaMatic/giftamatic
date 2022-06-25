import { Button, Dropdown, Tooltip } from "antd"
import Image from "next/image"
import { useEffect } from "react"
import { useState } from "react"
import { BigNumber, ethers } from 'ethers'
import { NETWORK, NETWORK_ID } from "../../config"
import { addMaticNetworkToMetamask, connectWallet, fetchAccountAddress, getMaticBalance, listenToNetworkChange } from "../../logics/wallet"
import { getGFTBalance } from "../../logics/giftToken"
import Link from "next/link"

type DataProps = {
  value: BigNumber
}

const GiftScore = ({ value }: DataProps) => {
  const maticValue = ethers.utils.formatEther(value.toString())
  return <Tooltip placement="bottom" title="Your Gift Score">
    <div className="flex mr-4 p-2 rounded-2xl text-center items-center bg-red-100 drop-shadow-md">
      <div className="flex items-center mr-1">
        <Image src="/assets/gift.png" height={20} width={20} />
      </div>
      <span className="text-sm text-red-500">{maticValue.split('.')[0] + '.' + maticValue.split('.')[1].slice(0, 2)} GFT</span>
    </div>
  </Tooltip>
}

const MaticBalance = ({ value }: DataProps) => {
  const maticValue = ethers.utils.formatEther(value.toString())
  return <Tooltip placement="bottom" title="Matic Balance">
    <div className="flex mr-4 p-2 rounded-2xl text-center items-center bg-sky-100 drop-shadow-md">
      <div className="flex items-center mr-1">
        <Image src="/assets/matic-logo.png" height={20} width={20} />
      </div>
      <span className="text-sm text-sky-500">{maticValue.split('.')[0] + '.' + maticValue.split('.')[1].slice(0, 2)} MATIC</span>
    </div>
  </Tooltip>
}

type HeaderProps = {
  accountAddress: string
}

const Header = ({ accountAddress }: HeaderProps) => {

  const [account, setAccount] = useState(accountAddress || '')
  const [accountBalance, setAccountBalance] = useState(BigNumber.from(0))
  const [accountGFTBalance, setGFTBalance] = useState(BigNumber.from(0))
  useEffect(() => {
    if (account !== '')
      getMaticBalance().then((val: BigNumber) => setAccountBalance(val))
    if (account !== '')
      getGFTBalance(account).then((val: BigNumber) => setGFTBalance(val))
  }, [account, accountAddress])

  useEffect(() => {
    fetchAccountAddress().then(val => setAccount(val))
  }, [])

  if (typeof window !== "undefined" && window.ethereum !== undefined) {
    window.ethereum.on('networkChanged', function (networkId: string) {
      if (networkId !== NETWORK_ID) {
        addMaticNetworkToMetamask()
        alert(`Please switch to Polygon ${NETWORK}...`)
      }
    })
    window.ethereum.on('accountChanged', function (selectedAccount: string) {
      if (selectedAccount !== account) {
        setAccount(selectedAccount)
      }
    })
  }

  // const [connected, setConnected] = useState(false)

  return <div className="top-0 left-0 right-0 p-4 flex items-center bg-white shadow-md">
    <Link href={'/'}><h1 className="flex-1 m-0 ml-3 text-2xl font-semibold drop-shadow-xl cursor-pointer">GiftaMatic</h1></Link>
    <Link href={'/nfts'}>
      <h2 className="flex justify-center items-center mb-0 mr-4 font-bold cursor-pointer">NFT SALE</h2>
    </Link>
    <GiftScore value={accountGFTBalance} />
    <MaticBalance value={accountBalance} />
    {
      <Button shape="round" size="middle" onClick={() => account === '' ? connectWallet().then((val) => setAccount(val)) : null} type="primary" style={{ height: "36px" }}> {account !== '' ? account.substring(0, 5) + '...' + account.substring(account.length - 4) : 'Connect Wallet'}</Button>
    }
  </div>

}

export default Header
