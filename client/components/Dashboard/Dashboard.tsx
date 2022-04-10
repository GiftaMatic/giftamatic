import { PlusCircleOutlined } from "@ant-design/icons"
import { Button } from "antd"
import Header from "../Header/Header"
import Campaign from "../Campaign/Campaign"
import { useState, useEffect } from 'react'
import { fetchAllCampaigns } from "../../logics/gift"
import { fetchAccountAddress } from "../../logics/wallet"
import { CampaignType } from "../types"
import { title } from "process"

const DashboardPage = () => {

  const [account, setAccount] = useState('')
  const [campaigns, setCampaigns] = useState(Array.from<CampaignType>([]))

  useEffect(() => {
    fetchAccountAddress().then(val => setAccount(val))
  }, [])

  useEffect(() => {
    if (account) {
      fetchAllCampaigns(account).then(campaigns => {
        let data = Array.from<CampaignType>([])
        campaigns.forEach((camp: any) => {
          const { title, description, image, collectedAmount, targetAmount, externalLink } = camp
          data.push({ title, description, collectedAmount, targetAmount, image, externalLink } as CampaignType)
        })
        setCampaigns(data)
      }
      )
    }
  }, [account])

  console.log(campaigns)

  return (
    <div className="dashboard-container h-screen ">
      <Header accountAddress="" />

      <div className="h-5/6">
        <h1 className="dashboard-heading flex flex-row m-4 text-3xl font-semibold drop-shadow-xl" >Your Campaigns
          <Button className="flex justify-center items-center ml-4" type="primary" shape="round" size="middle" style={{ height: "36px", width: "180px", display: 'flex', flexDirection: 'row' }} > Create Campaign <PlusCircleOutlined /> </Button>
        </h1>
        <Campaign arr={campaigns} />
      </div>

    </div>
  )
}


export default DashboardPage