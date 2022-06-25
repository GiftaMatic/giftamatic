import Head from 'next/head'
import React from 'react'
import Donation from '../../components/Donation/Donation'
import { CampaignType } from '../../components/types'
import { fetchCampaign } from '../../logics/gift'

const DonationPage = ({ campaignData }: { campaignData: CampaignType }) => {
  return <>
    <Head>
      <title>{campaignData.title} - GiftaMatic</title>
      <meta property="og:title" content={`${campaignData.title} - GiftaMatic`} key="title" />
      <meta property="og:description" content={`${campaignData.description.slice(0, 300)}...`} key="description" />
      <meta property="og:image" content={campaignData.image} key="image" />
    </Head>
    <Donation campaign={campaignData} />
  </>
}

export const getServerSideProps = async (context: any) => {
  const { address, id } = context.query

  const campaignData = await fetchCampaign(address, id)
  const data: CampaignType = {
    title: campaignData.title,
    description: campaignData.description,
    externalLink: campaignData.externalLink,
    collectedAmount: campaignData.collectedAmount,
    targetAmount: campaignData.targetAmount,
    image: campaignData.image,
  }
  return {
    props: {
      campaignData: data
    }
  }
}

export default DonationPage