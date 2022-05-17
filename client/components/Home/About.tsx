import React from "react"
import Link from "next/link"


const About = () => {
  return <div className='my-20 text-center'>
    <div className='flex flex-col lg:flex-row'>
      <div className='flex flex-1 flex-col items-center justify-center'>
        <h1 className='text-4xl mb-10'>About <span className='text-red-500'>GiftaMatic</span></h1>
        <p className='text-lg mx-2 text-justify md:mx-4 lg:mx-8'>GiftaMatic is blockchain based donation platform which allows people to create donation campaigns on the blockchain. It is deployed on the Polygon Network. People can donate matics to these campaigns and get rewarded with GFT tokens which represent their Gift Score. These GFT Tokens aka Gift Score is non-transferrable and can only be earned by donating on the platform. We are planning to airdrop some cool NFTs to the people with a certain Gift Score in near future. We promote, encourage and reward donations.</p>
        <h1 className='text-xl'>Tushar Ojha <br /> <span className='text-lg'>Founder, <Link href="https://educate.tusharojha.com">Educate App</Link></span></h1>
      </div>
      <div className='flex flex-1 flex-col items-center'>
        <iframe className='w-full lg:w-5/6 xl:h-[400px] lg:h-[300px] h-[400px]' src="https://www.youtube.com/embed/6hP7nQAgKeg" title="GiftaMatic live demo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
      </div>
    </div>
  </div>
}

export default About

