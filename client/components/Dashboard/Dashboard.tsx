import {PlusCircleOutlined } from "@ant-design/icons"
import { Modal, Button } from 'antd';
import Header from "../Header/Header"
import Campaign from "../Campaign/Campaign"
import {useState, useRef} from 'react'

const DashboardPage = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    // const [imageURL, setImageURL] = useState("");
    const [selectedFile, setSelectedFile] = useState(undefined)
    const [associatedLink, setAssociatedLink] = useState("");
    const [targetAmount, setTargetAmount] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  

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
          <Button  className="m-4" type="primary" shape="round" size="middle" onClick={showModal}  style={{ height: "36px" }} > Create Campaign <PlusCircleOutlined /> </Button>
          </h1>
          <Campaign arr={arr}/>
        </div>

        <Modal title="Create Campaign"  visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
        footer={[
            <Button key="back" shape="round" size="middle" onClick={handleCancel}>
              Return
            </Button>,
            <Button key="submit" shape="round" size="middle" type="primary" onClick={handleOk}>
              Submit
            </Button>,
            
          ]}>
            <div className="flex h-4/6 flex-col">

                <label className="font-bold" htmlFor = "title">Title </label>
                <input value={title} className="px-2 mb-3 border-2 border-red-300 rounded-lg bg-red-100" onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                
                <label className="font-bold" htmlFor = "description">Description </label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="px-2 border-2 border-red-300 mb-3 rounded-lg bg-red-100" placeholder="Description" />

                <label  className="font-bold" htmlFor = "image">Image URL </label>
                <input type="file"  onChange={(e)=>setSelectedFile(e.target.files[0])} />

                <label className="font-bold mt-3" htmlFor = "associatedLink">Associated Link </label>
                <input value={associatedLink} onChange={(e) => setAssociatedLink(e.target.value)} className="px-2 mb-3 border-2 border-red-300 rounded-lg bg-red-100" placeholder="Associated Link" />

                <label className="font-bold" htmlFor = "targetAmount">Target Amount</label>
                <input type="number" placeholder="0" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} className="px-2 border-2 border-red-300 rounded-lg bg-red-100" />

            </div>
        </Modal>

    </div>
  )
}


export default DashboardPage