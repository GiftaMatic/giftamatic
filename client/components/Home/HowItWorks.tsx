import React from 'react'
import { GiftOutlined, TeamOutlined, PictureOutlined, ShareAltOutlined, DollarOutlined, UserOutlined, ArrowRightOutlined } from "@ant-design/icons"

const HowItWorks = () => {
  return <div className='mt-20 text-center'>
    <h1 className='text-4xl'>How it works?</h1>
    <div className='flex justify-center items-center mt-10 md:flex-row flex-col'>
      <div className='flex flex-col items-center md:mx-2 md:my-0 my-2'>
        <UserOutlined style={{ fontSize: '30px' }} /><span className='text-lg'>You</span>
      </div>
      <ArrowRightOutlined className='rotate-90 md:rotate-0' style={{ fontSize: '30px' }} />
      <div className='flex flex-col items-center md:mx-2 md:my-0 my-2'>
        <DollarOutlined style={{ fontSize: '30px' }} /><span className='text-lg'>Creates Donation Campaign</span>
      </div>
      <ArrowRightOutlined className='rotate-90 md:rotate-0' style={{ fontSize: '30px' }} />
      <div className='flex flex-col items-center md:mx-2 md:my-0 my-2'>
        <ShareAltOutlined style={{ fontSize: '30px' }} /> <span className='text-lg'>Share on Social Media</span>
      </div>
      <ArrowRightOutlined className='rotate-90 md:rotate-0' style={{ fontSize: '30px' }} />
      <div className='flex flex-col items-center md:mx-2 md:my-0 my-2'>
        <TeamOutlined style={{ fontSize: '30px' }} /> <span className='text-lg'>People Donates</span>
      </div>
      <ArrowRightOutlined className='rotate-90 md:rotate-0' style={{ fontSize: '30px' }} />
      <div className='flex flex-col items-center md:mx-2 md:my-0 my-2'>
        <GiftOutlined style={{ fontSize: '30px' }} /> <span className='text-lg'>Donor gets GFT tokens</span>
      </div>
      <ArrowRightOutlined className='rotate-90 md:rotate-0' style={{ fontSize: '30px' }} />
      <div className='flex flex-col items-center md:mx-2 md:my-0 my-2'>
        <PictureOutlined style={{ fontSize: '30px' }} /> <span className='text-lg'>Get NFT airdrops</span>
      </div>
    </div>
  </div>
}

export default HowItWorks