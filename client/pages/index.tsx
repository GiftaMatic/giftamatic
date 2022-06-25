import { useState, useEffect } from 'react'
import { Button, Card, List } from 'antd'
import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header/Header'
import About from '../components/Home/About'
import HowItWorks from '../components/Home/HowItWorks'
import Intro from '../components/Home/Intro'
import { fetchAccountAddress, connectWallet } from '../logics/wallet'
import FeaturedCampaigns from '../components/Home/FeaturedCampaigns'
import Footer from '../components/Footer/Footer'

const Home: NextPage = () => {

  const [account, setAccount] = useState('')

  useEffect(() => {
    fetchAccountAddress().then(val => setAccount(val))
  }, [])

  return <div>
    <div className='flex flex-col h-screen'>
      <Head>
        <title>GiftaMatic: Donate and Get Rewarded</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Tushar Ojha" />
        <meta name="description" content="GiftaMatic is an blockchain based donation platform. It allows people to donate Matic and earn GFT tokens. GFT tokens enables participation in NFTs airdrop and more. Create Donation Campaigns and Donate Matic for the cause." />
      </Head>
      <Header accountAddress={account} />
      <Intro address={account} connectWallet={() => { connectWallet().then((val: string) => setAccount(val)) }} />
    </div>
    <HowItWorks />
    <About />
    <FeaturedCampaigns />
    <Footer />
  </div>
}

export default Home
