import Head from 'next/head'
import React from 'react'
import NftsPage from '../../components/Nfts/Nfts'

const Nfts = () => {
  return <>
    <Head>
      <title>NFT Sale - GiftaMatic: Donate and Get Rewarded</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="author" content="GiftaMatic" />
      <meta name="description" content="Dashboard | GiftaMatic is an blockchain based donation platform. It allows people to donate Matic and earn GFT tokens. GFT tokens enables participation in NFTs airdrop and more. Create Donation Campaigns and Donate Matic for the cause." />
    </Head>
    <NftsPage />
  </>
}

export default Nfts