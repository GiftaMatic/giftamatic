import { LoadingOutlined, PlusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Modal, Spin, Upload } from "antd"
import Header from "../Header/Header"
import Campaign from "../Campaign/Campaign"
import { useState, useEffect, useCallback, useRef } from 'react'
import { createCampaign, fetchAllCampaigns } from "../../logics/gift"
import { fetchAccountAddress } from "../../logics/wallet"
import { CampaignType } from "../types"
import { toast } from "react-toastify"
import { Web3Storage } from 'web3.storage'
import { ipfsToken } from "../../config"
import ReactMarkdown from "react-markdown"
import Editor from "react-markdown-editor-lite"
import remarkGfm from 'remark-gfm'
import "react-markdown-editor-lite/lib/index.css"

const getBase64 = (img: any, callback: any) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const DashboardPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [account, setAccount] = useState('');
  const [loadingCampaigns, setCampaignLoading] = useState(false);
  const [campaigns, setCampaigns] = useState(Array.from<CampaignType>([]));
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('')
  const [associatedLink, setAssociatedLink] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const mdEditor = useRef(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);

    if (account !== undefined && account !== '') {
      if (!imageUrl || !image) {
        toast("Please upload a related image.")
        return
      }
      const storage = new Web3Storage({ token: ipfsToken } as any)
      const imageBlob = new Blob([imageUrl])
      const img = new File([imageBlob], 'image.txt')

      const imageCid = await storage.put([img])
      console.log(imageCid)

      const data = {
        title,
        description,
        image: imageCid,
        associatedLink
      }
      const jsonData = JSON.stringify(data)

      const dataBlob = new Blob([jsonData])
      const dataFile = new File([dataBlob], 'details.json')

      const campaignCid = await storage.put([dataFile])
      createCampaign(account, targetAmount, campaignCid).then((r) => {
        toast(`Created campaign successfully!`)
        setTitle('')
        setDescription('')
        setImageUrl('')
        setAssociatedLink('')
        setTargetAmount('')

        window.location.reload()
      }).catch((e) => {
        toast(`Unable to create campaign: ${e}`)
      })
    }
  };

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

  const handleCancel = () => {
    setIsModalVisible(false);
  };
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

  useEffect(() => {
    fetchAccountAddress().then(val => setAccount(val))
  }, [])

  useEffect(() => {
    setCampaignLoading(true);
    if (account) {
      fetchAllCampaigns(account).then(async campaigns => {
        let data = Array.from<CampaignType>([])
        campaigns.forEach(async (camp: any, index: number) => {
          const { collectedAmount, targetAmount, CID } = camp
          const resp = await fetchData(CID, collectedAmount, targetAmount)
          data.push(resp)
          if (index === campaigns.length - 1) {
            setCampaigns(data);
          }
        })
      }
      ).then(() => {
        setCampaignLoading(false);
      })
    }
  }, [account])

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (url: any) => {
        setLoading(false);
        setImageUrl(url);
        setImage(info.file);
      });
    }
  };

  const beforeUpload = useCallback((file: File | Blob) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
    if (!isJpgOrPng) {
      toast('You can only upload JPG/PNG/GIF file.')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      toast('Image must be smaller than 2MB.')
    }
    return isJpgOrPng && isLt2M
  }, [])

  const UploadButton = ({ loading }: { loading: boolean }) => (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const handleEditorChange = ({ html, text }: { html: any, text: any }) => {
    setDescription(text);
  };

  return (
    <div className="dashboard-container h-screen ">
      <Header accountAddress="" />

      <div className="h-5/6">
        <h1 className="dashboard-heading flex flex-row m-4 text-3xl font-semibold drop-shadow-xl" >Your Campaigns
          <Button onClick={() => showModal()} className="flex justify-center items-center ml-4" type="primary" shape="round" size="middle" style={{ height: "36px", width: "180px", display: 'flex', flexDirection: 'row' }} > Create Campaign <PlusCircleOutlined /> </Button>
        </h1>
        {loadingCampaigns ? <div className="flex h-full items-center justify-center"><Spin size="large" /></div> : <Campaign address={account} arr={campaigns} />}
      </div>

      <Modal title="Create Campaign" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
        footer={[
          <Button key="back" shape="round" size="middle" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" shape="round" size="middle" type="primary" onClick={handleOk}>
            Create
          </Button>,
        ]}>
        <div className="flex h-4/6 flex-col">

          <label className="font-bold" htmlFor="title">Title </label>
          <input value={title} className="px-2 mb-3 border-2 border-red-300 rounded-lg" onChange={(e) => setTitle(e.target.value)} placeholder="Title" />

          <label className="font-bold" htmlFor="description">Description </label>
          <Editor
            ref={mdEditor}
            value={description}
            className="border-2 border-red-300 mb-3 rounded-lg"
            onChange={handleEditorChange}
            renderHTML={text => <ReactMarkdown children={text} remarkPlugins={[remarkGfm]} />}
          />
          <label className="font-bold" htmlFor="image">Image </label>
          <Upload
            action={'/api/noop'}
            listType="picture-card"
            accept='.gif, .png, .jpeg, .jpg'
            onChange={handleChange}
            multiple={false}
            showUploadList={false}
            beforeUpload={beforeUpload}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: '100%',
                }}
              />
            ) : <UploadButton loading={loading} />}
          </Upload>
          <label className="font-bold mt-3" htmlFor="associatedLink">Associated Link </label>
          <input value={associatedLink} onChange={(e) => setAssociatedLink(e.target.value)} className="px-2 mb-3 border-2 border-red-300 rounded-lg" placeholder="Associated Link" />

          <label className="font-bold" htmlFor="targetAmount">Target Amount (in MATIC)</label>
          <input type="text" placeholder="0" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} className="px-2 border-2 border-red-300 rounded-lg" />

        </div>
      </Modal>
    </div>
  )
}


export default DashboardPage;