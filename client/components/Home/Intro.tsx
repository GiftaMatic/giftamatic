import React from "react"
import Router from 'next/router'

import { Button } from 'antd'
import { GiftOutlined, TeamOutlined, ArrowRightOutlined } from "@ant-design/icons"

type IntroProps = {
  address: string
  connectWallet: Function
}

const Intro = ({ address, connectWallet }: IntroProps) => {
  return <div className='flex flex-col h-full justify-center items-center gradientContainer'>
    <h1 className='text-7xl text-white'>GiftaMatic</h1>
    <p className='text-xl text-slate-200 text-center'>Create, Share &amp; Donate Matic on the Blockchain</p>
    <div className='flex items-center text-center'>
      <div className='flex items-center mr-2'>
        <TeamOutlined style={{ color: '#fff', fontSize: '30px' }} /> <span className='text-xl text-white ml-1'>Donate for the cause</span>
      </div>
      <ArrowRightOutlined style={{ color: '#fff', fontSize: '30px' }} />
      <div className='flex items-center ml-2'>
        <GiftOutlined style={{ color: '#fff', fontSize: '30px' }} /> <span className='text-xl text-white ml-1'>Recieve GFTs from us</span>
      </div>
    </div>
    <div className='flex mt-6'>
      <Button onClick={() => address !== '' ? Router.push('/dashboard') : connectWallet()} className='drop-shadow-xl' size='large' shape='round' type='primary'>{address !== '' ? 'Dashboard' : 'Connect Wallet'}</Button>
      <Button onClick={() => {
        window.scrollTo({ top: window.screen.height * 0.9, behavior: 'smooth' })
      }} className='drop-shadow-xl ml-2 text-white' size='large' shape='round' type='default'>How it works?</Button>
    </div>
  </div>
}

export default Intro
