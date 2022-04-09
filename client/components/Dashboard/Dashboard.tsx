import {PlusCircleOutlined } from "@ant-design/icons"
import { Button } from "antd"
import Header from "../Header/Header"
import Campaign from "../Campaign/Campaign"
import {useState} from 'react'

const DashboardPage = () => {

  const [arr, setArr] = useState([
 {
      "name":"Campaign",
      "desc":"Please Help Me. I'm Broke",
      "date":"12/45/4657",
      "collectedAmount": "4",
      "targetAmount": "10",
  },
  {
    "name":"Campaign",
    "desc":"Please Help Me. I'm Broke",
    "date":"12/45/4657",
    "collectedAmount": "4",
    "targetAmount": "10"
},
{
    "name":"Campaign",
    "desc":"Please Help Me. I'm Broke",
    "date":"12/45/4657",
    "collectedAmount": "4",
    "targetAmount": "10"
},
{
    "name":"Campaign",
    "desc":"Please Help Me. I'm Broke",
    "date":"12/45/4657",
    "collectedAmount": "4",
    "targetAmount": "10"
},
]) 

  
  return (
    <div className="dashboard-container h-screen ">
        <Header/>

        <div className="h-5/6 ">
          <h1 className="dashboard-heading m-4 text-3xl font-semibold drop-shadow-xl" >Your Campaigns
          <Button  className="m-4" type="primary" shape="round" size="middle"  style={{ height: "36px" }} > Create Campaign <PlusCircleOutlined /> </Button>
          </h1>
          <Campaign arr={arr}/>
        </div>

    </div>
  )
}


export default DashboardPage