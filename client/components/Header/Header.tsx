import { Button, Tooltip } from "antd"
import Image from "next/image"
import {useState} from "react"

const GiftScore = () => {
  return <Tooltip placement="bottom" title="Your Gift Score">
    <div className="flex mr-4 p-2 rounded-2xl text-center items-center bg-red-100 drop-shadow-md">
      <div className="flex items-center mr-1">
        <Image src="/assets/gift.png" height={20} width={20} />
      </div>
      <span className="text-sm text-red-500">35.60 GFT</span>
    </div>
  </Tooltip>
}

const MaticBalance = () => {
  return <Tooltip placement="bottom" title="Matic Balance">
    <div className="flex mr-4 p-2 rounded-2xl text-center items-center bg-sky-100 drop-shadow-md">
      <div className="flex items-center mr-1">
        <Image src="/assets/matic-logo.png" height={20} width={20} />
      </div>
      <span className="text-sm text-sky-500">50.65 MATIC</span>
    </div>
  </Tooltip>
}

const Header = () => {

  const [connected, setConnected] = useState(false)

  return <div className="top-0 left-0 right-0 p-4 flex items-center bg-white shadow-md">
    <h1 className="flex-1 m-0 ml-3 text-2xl font-semibold drop-shadow-xl">GiftaMatic</h1>
    <GiftScore />
    <MaticBalance />
    <Button shape="round" size="middle" onClick={() => { }} type="primary" style={{ height: "36px" }}>Connect Wallet</Button>
  </div>

}

export default Header
