import React from 'react'
import { Layout, Col, Button, Input, Modal } from "antd"
import { GiftOutlined, LinkOutlined, ShareAltOutlined } from "@ant-design/icons"
import ProgressBar from "../Campaign/ProgressBar"
import { toast } from 'react-toastify'
import { ethers } from 'ethers'
import { useState } from 'react'
import { approveNFT, fetchNFT, giftNFT } from '../../logics/gift'
import NFTView from './NftView'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const Details = ({ address, id, showDonate, name, description, collectedAmount, targetAmount, image, externalLink, className, donorAccount = '', onDonate }: { address: any, id: any, showDonate: any, name: any, description: any, collectedAmount: any, targetAmount: any, image: any, externalLink: any, className: any, donorAccount: any, onDonate: Function }) => {
  const collectedAmountNumber = ethers.utils.formatEther(collectedAmount)
  const collectedValue = collectedAmountNumber.split('.')[0] + '.' + collectedAmountNumber.split('.')[1].slice(0, 2)
  const targetAmountNumber = ethers.utils.formatEther(targetAmount)
  const targetAmountValue = targetAmountNumber.split('.')[0] + '.' + targetAmountNumber.split('.')[1].slice(0, 2)
  const progress = parseFloat(collectedAmountNumber) / parseFloat(targetAmountNumber) * 100
  const [donateAmount, setDonateAmount] = useState('')
  const [minimumPrice, setMinimumPrice] = useState('0.1')
  const [contractAddress, setContractAddress] = useState('')
  const [tokenId, setTokenId] = useState('')
  const [nft, setNft] = useState<object | null>(null)
  const [doanteModalVisible, setDonateModalVisible] = useState(false)
  const [donateNFTVisible, setDonateNFTVisible] = useState(false)
  const [loadingTxn, setLoadingTxn] = useState(false)
  const [loadingNFTTxn, setLoadingNFTTxn] = useState(false)
  const [isApproved, setIsApproved] = useState(false)

  const donate = () => {
    setDonateModalVisible(true)
  }

  const donateBtn = () => {
    setLoadingTxn(true)
    onDonate(donateAmount)
    setLoadingTxn(false)
  }

  const cancelBtn = () => setDonateModalVisible(false)

  const donateNFTBtn = async () => {
    if (nft !== null && isApproved) {
      setLoadingNFTTxn(true)
      try {
        giftNFT(contractAddress, tokenId, minimumPrice, address, id, donorAccount).then((v) => {
          toast('Thanks for donating.')
          window.location.reload()
        }).catch(e => {
          console.log(e)
          toast('Unable to send a donation.')
        })
      } catch (e) {
        console.log(e)
      } finally {
        setLoadingNFTTxn(false)
        setDonateNFTVisible(false)
      }
      return;
    }
    if (nft === null) {
      setLoadingNFTTxn(true)
      const nftData = await fetchNFT(contractAddress, tokenId)
      if (nftData.slice(0, 4) === "ipfs") {
        fetch('https://ipfs.io/ipfs/' + nftData.slice(7)).then(res => res.json()).then(data => {
          setLoadingNFTTxn(false)
          setNft(data)
        }).catch((e: any) => console.log(e))
      } else if (nftData.slice(0, 4) === "http") {
        fetch(nftData).then(res => res.json()).then(data => {
          setLoadingNFTTxn(false)
          setNft(data)
        }).catch((e: any) => console.log(e))
      } else {
        console.log(nftData)
        const data = JSON.parse(nftData)
        setLoadingNFTTxn(false)
        setNft(data)
      }

    } else {
      setLoadingNFTTxn(true)
      try {
        await approveNFT(contractAddress, tokenId, donorAccount)
        setIsApproved(true)
      } catch (e) {
        console.log(e)
      } finally {
        setLoadingNFTTxn(false)
      }
    }
  }

  const cancelNFTBtn = () => {
    setNft(null)
    setContractAddress('')
    setTokenId('')
    setDonateNFTVisible(false)
    setLoadingNFTTxn(false)
    setIsApproved(false)
    setLoadingNFTTxn(false)
    setMinimumPrice('0.1')
  }

  return (
    <>
      <Layout className={`flex flex-col ${className}`}>
        <Layout className='w-full h-full'>
          <h2 className='text-3xl flex items-left float-left ml-2'> {name} </h2>
          <div className='ml-2'>
            <ProgressBar bgcolor="red" progress={progress} height={25} />
          </div>
          <p className='text-sm font-bold flex float-left m-2'>{collectedValue} MATIC collected out of {targetAmountValue} MATIC target.</p>
          <div className='flex flex-row w-[220px]'>
            <Button onClick={() => { if (externalLink !== '') { window.location.assign(externalLink) } else { alert('No external URL available.') } }} shape='round' style={{ display: 'flex' }} className='m-2 w-[100px] flex flex-1 items-center justify-center rounded-xl'>Link <LinkOutlined /></Button>
            <Button onClick={() => {
              navigator.clipboard.writeText(window.location.host + '/' + address + '/' + (id));
              toast('Link copied to clipboard');
            }} shape='round' style={{ display: 'flex' }} className='m-2 w-[100px] flex flex-1 items-center justify-center rounded-xl'>Share <ShareAltOutlined /></Button>
          </div>
          {
            showDonate ? <>
              <Button onClick={() => donate()} type='primary' shape='round' style={{ display: 'flex' }} className='m-2 w-[100px] flex flex-1 items-center justify-center rounded-xl'>Donate <GiftOutlined /></Button>
            </> : <div></div>
          }

          <div className='flex flex-col-reverse lg:flex-row'>
            <Col className='lg:w-5/6'>
              <p className='text-lg flex float-left text-justify m-2'>
                <ReactMarkdown children={description} remarkPlugins={[remarkGfm]} />
              </p>
            </Col>
            <Col className='ml-1'>
              <img className='w-full rounded-xl shadow-xl' src={image} />
            </Col>
          </div>
        </Layout>
      </Layout>

      <Modal
        title="Donating NFT 🏞"
        visible={donateNFTVisible}
        onOk={donateNFTBtn}
        confirmLoading={loadingNFTTxn}
        onCancel={cancelNFTBtn}
        okText={nft === null ? 'Fetch NFT' : isApproved ? 'Send NFT' : 'Approve'}
      >
        {isApproved ? <>
          <h2 className='flex justify-center'>Please choose minimum price for sale (in MATIC): </h2>
          <Input type="text" placeholder='min. price' value={minimumPrice} onChange={(e) => setMinimumPrice(e.target.value)} className='h-[30px] rounded-xl' />
        </> : <>
          <h1 className='flex justify-center'>{nft === null ? "Enter NFT details" : (nft as any)['name'] as string}</h1>
          {nft === null ? <div className='flex flex-col w-[220px] justify-center items-center mb-4'>
            <Input type="text" placeholder='Smart Contract address' value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} className='h-[30px] rounded-md mb-2' />
            <Input type="text" placeholder='Token Id' value={tokenId} onChange={(e) => setTokenId(e.target.value)} className='h-[30px] rounded-md mt-2' />
          </div> : <NFTView nft={nft} />}
        </>}

      </Modal>

      <Modal
        title="Please donate 🙏🏻"
        visible={doanteModalVisible}
        onOk={donateBtn}
        confirmLoading={loadingTxn}
        onCancel={cancelBtn}
        okText={'Donate (in Matic)'}
      >
        <h3>Donate via</h3>
        <div className='flex flex-row w-[220px] justify-center items-center mb-4'>
          <Input type="text" placeholder='in Matic' value={donateAmount} onChange={(e) => setDonateAmount(e.target.value)} className='h-[30px] rounded-xl' />
        </div>
        <hr />
        <h2 className='mt-4'>Donate via NFT</h2>
        <Button onClick={() => {
          setDonateModalVisible(false)
          setDonateNFTVisible(true)
        }} shape='round'>Choose an NFT</Button>
      </Modal>
    </>
  );
}

export default Details