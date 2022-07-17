import { useState, useEffect } from 'react'
import { Button, Card, List } from 'antd'
import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header/Header'
import { fetchAccountAddress, connectWallet } from '../logics/wallet'
import FeaturedCampaigns from '../components/Home/FeaturedCampaigns'
import Footer from '../components/Footer/Footer'

const Home: NextPage = () => {

  const [account, setAccount] = useState('')

  useEffect(() => {
    fetchAccountAddress().then(val => setAccount(val))
  }, [])

  return <div>
    <div className='flex flex-col'>
      <Head>
        <title>Featured Campaigns - GiftaMatic: Donate and Get Rewarded</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Tushar Ojha" />
        <meta name="description" content="GiftaMatic is an blockchain based donation platform. It allows people to donate Matic and earn GFT tokens. GFT tokens enables participation in NFTs airdrop and more. Create Donation Campaigns and Donate Matic for the cause." />
      </Head>
      <Header accountAddress={account} />
    </div>
    <FeaturedCampaigns showFull />
    <Footer />
  </div>
}

export default Home
