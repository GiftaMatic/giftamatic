import { Button, Card } from 'antd'
import Link from 'next/link'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Web3 from 'web3'
import { buyNftFromContract, fetchNFT } from '../../logics/gift'

type NFTCardProps = {
  nftGift: any
  index: number
  account: string
}

const { Meta } = Card

const NFTCard = ({ nftGift, index, account }: NFTCardProps) => {

  const [nft, setNft] = useState<any>({
    name: 'Loading...',
    image: '',
  })

  const nftLink = (str: string) => (
    (str.includes('ipfs://')) ? str.replace('ipfs://', 'https://ipfs.io/ipfs/') : str
  )

  useEffect(() => {
    const fetchNFTData = async () => {
      try {
        const response = await fetchNFT(nftGift['contractAddress'], nftGift['tokenId'])
        if (response.slice(0, 4) === "ipfs") {
          fetch('https://ipfs.io/ipfs/' + response.slice(7)).then(res => res.json()).then(data => {
            setNft(data)
          }).catch((e: any) => console.log(e))
        } else if (response.slice(0, 4) === "http") {
          fetch(response).then(res => res.json()).then(data => {
            setNft(data)
          }).catch((e: any) => console.log(e))
        } else {
          const data = JSON.parse(response)
          setNft(data)
        }
      } catch (e) {
        console.log(e)
        toast((e as any).message)
      }
    }
    fetchNFTData()
  }, [])

  const buyNft = async () => {
    try {
      const response = await buyNftFromContract(index, account, Web3.utils.fromWei(nftGift['price'], 'ether'))
      console.log(response)
    } catch (e) {
      console.log(e)
      toast((e as any).message)
    }
  }

  return nftGift['status'] !== 0 ? <></> : <Card
    key={nftGift['contractAddress'] + nftGift['tokenId']}
    className='w-[300px] rounded-xl'
    cover={
      <img
        style={{ height: '300px', objectFit: 'contain' }}
        alt={nft['title']}
        src={nftLink(nft['image'])}
      />
    }
    actions={[
      <Link href={`/${nftGift['campaignCreator']}/${nftGift['campaignId']}`}>
        <Button type='link'>View Campaign</Button>
      </Link>,
      <Button onClick={() => buyNft()} type='primary'>Buy Now</Button>
    ]}
  >
    <Meta
      title={nft['name']}
      description={`Price: ${Web3.utils.fromWei(nftGift['price'], 'ether')} MATIC`}
      style={{ textAlign: 'justify' }}
    />
  </Card>
}

export default NFTCard
