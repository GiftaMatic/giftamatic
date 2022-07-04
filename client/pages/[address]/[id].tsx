import Head from 'next/head'
import React from 'react'
import Donation from '../../components/Donation/Donation'
import { CampaignType } from '../../components/types'
import { fetchCampaign } from '../../logics/gift'
import { toast } from "react-toastify"
import { Web3Storage } from 'web3.storage'
import { ipfsToken } from "../../config"

const DonationPage = ({ campaignData }: { campaignData: CampaignType }) => {
  return <>
    <Head>
      <title>{campaignData.title} - GiftaMatic</title>
      <meta property="og:title" content={`${campaignData.title} - GiftaMatic`} key="title" />
      <meta property="og:description" content={`${campaignData.description?.slice(0, 300)}...`} key="description" />
      <meta property="og:image" content={campaignData.image} key="image" />
    </Head>
    <Donation campaign={campaignData} />
  </>
}

const retrieveFiles = async (cid: any) => {
  const storage = new Web3Storage({ token: ipfsToken } as any)
  const res = await storage.get(cid)

  if (res == null) {
    toast(`Campaign with CID ${cid} not found`)
    return;
  }
  console.log(`Response [${res.status}]  ${res.statusText}`);
  if (!res.ok) {
    throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`)
  }

  const files = await res.files()
  return await files[0].text();
}

const retrieveImageData = async (data: any) => {
  let dataObj = JSON.parse(data);
  let imageURL = await retrieveFiles(dataObj.image);
  dataObj.image = imageURL;

  return JSON.stringify(dataObj);
}

const getFile = async (CID: string) => { 
  let file = await retrieveFiles(CID); // bafybeigdmca5e67itp5bfykctq2rww3rymjzbglu7rm7w6q7dfijcusmwa 
  const finalFile = await retrieveImageData(file); 
  return JSON.parse(finalFile);
}
const fetchData = async (CID: string, collectedAmount: string, targetAmount: string) => {
  const data = await getFile(CID);
  const { title, description, image, associatedLink } = data;
  return { title, description, collectedAmount, targetAmount, image, associatedLink, CID } as CampaignType
}

export const getServerSideProps = async (context: any) => {
  const { address, id } = context.query

  const campaignData = await fetchCampaign(address, id)
  const data: CampaignType = {
    collectedAmount: campaignData.collectedAmount,
    targetAmount: campaignData.targetAmount,
    CID: campaignData.CID,
  }
  const response = await fetchData(data.CID, data.collectedAmount, data.targetAmount);
 
  return {
    props: {
      campaignData: response
    }
  }
}

export default DonationPage