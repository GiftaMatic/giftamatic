import { Col, Row } from 'antd'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { getNFTs } from '../../logics/gift'
import { fetchAccountAddress } from '../../logics/wallet'
import Header from '../Header/Header'
import NFTCard from './NftCard'

const NftsPage = () => {
  const [nfts, setNfts] = useState<any[]>([])
  const [account, setAccount] = useState('')

  useEffect(() => {
    const fetchSaleNFTs = async () => {
      try {
        const response = await getNFTs()
        setNfts((response as any[]))
      } catch (e) {
        console.log(e)
        toast((e as any).message)
      }
    }

    fetchSaleNFTs()
  }, [])

  useEffect(() => {
    fetchAccountAddress().then(val => setAccount(val))
  }, [])

  return <div className="dashboard-container h-screen">
    <Header accountAddress="" />
    <div className='flex flex-col items-center justify-center mt-2'>
      <Row gutter={16}>
        {nfts.map((nft, i) => {
          return <Col key={nft['contractAddress'] + nft['tokenId']} className="gutter-row">
            <NFTCard account={account} index={i} nftGift={nft} />
          </Col>
        })}
      </Row>
    </div>
  </div>
}

export default NftsPage
