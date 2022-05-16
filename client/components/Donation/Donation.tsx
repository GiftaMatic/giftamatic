import { Button } from 'antd'
import Router from 'next/router'
import React, { useState, useEffect } from 'react'
import { fetchAllCampaigns, fetchCampaignById, giftMatic } from '../../logics/gift'
import { fetchAccountAddress } from '../../logics/wallet'
import { useRouter } from 'next/router'
import Campaign from '../Campaign/Campaign'
import Details from '../Campaign/Details'
import Header from '../Header/Header'
import { CampaignType } from '../types'
import { LoadingOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'

type DonationProps = {
  campaign: CampaignType
}

type DonationPageProps = {
  campaign: CampaignType,
  address: string,
  campaignId: string
}

const DonationPageContent = ({ campaign, address, campaignId }: DonationPageProps) => {

  const [account, setAccount] = useState('')

  useEffect(() => {
    fetchAccountAddress().then(val => setAccount(val))
  }, [])
  console.log(campaign.title)
  return (
    <div className="dashboard-container h-screen ">
      <Header accountAddress="" />
      {<div className='flex flex-1 m-10 justify-center float-center items-center'>
        <Details
          onDonate={(amount: number) => {
            giftMatic(address, campaignId, account, amount).then((v) => {
              toast('Thanks for donating.')
              window.location.reload()
            }).catch(e => {
              console.log(e)
              toast('Unable to send a donation.')
            })
          }}
          donorAccount={account}
          address={address}
          id={campaignId}
          showDonate={true}
          className='p-10 rounded-xl shadow-md'
          externalLink={campaign.externalLink}
          name={campaign.title}
          collectedAmount={campaign.collectedAmount}
          targetAmount={campaign.targetAmount}
          description={campaign.description}
          image={campaign.image} />
      </div>}

    </div>
  )
}

const Donation = ({ campaign }: DonationProps) => {
  const router = useRouter()
  const { address, id } = router.query
  return <DonationPageContent campaign={campaign} address={address as string} campaignId={id as string} />
}

export default Donation
