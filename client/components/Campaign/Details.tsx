import React from 'react'
import { Layout, Col, Row, Button, Input } from "antd"
import { GiftOutlined, LinkOutlined, RightOutlined, ShareAltOutlined } from "@ant-design/icons"
import ProgressBar from "../Campaign/ProgressBar"
import { toast } from 'react-toastify'
import { BigNumber, ethers } from 'ethers'
import { useState } from 'react'
import { giftMatic } from '../../logics/gift'

const Details = ({ address, id, showDonate, name, description, collectedAmount, targetAmount, image, externalLink, className, donorAccount = '', onDonate }: { address: any, id: any, showDonate: any, name: any, description: any, collectedAmount: any, targetAmount: any, image: any, externalLink: any, className: any, donorAccount: any, onDonate: Function }) => {
  const collectedAmountNumber = ethers.utils.formatEther(collectedAmount)
  const collectedValue = collectedAmountNumber.split('.')[0] + '.' + collectedAmountNumber.split('.')[1].slice(0, 2)
  const targetAmountNumber = ethers.utils.formatEther(targetAmount)
  const targetAmountValue = targetAmountNumber.split('.')[0] + '.' + targetAmountNumber.split('.')[1].slice(0, 2)
  const progress = parseFloat(collectedAmountNumber) / parseFloat(targetAmountNumber) * 100
  const [donateAmount, setDonateAmount] = useState('0')

  return (
    <>
      <Layout className={`flex flex-col ${className}`}>
        <Layout className='w-full h-full'>
          <h2 className='text-3xl flex items-left float-left ml-2'> {name} </h2>
          <div className='ml-2'>
            <ProgressBar bgcolor="red" progress={progress} height={25} />
          </div>
          <p className='text-sm font-bold flex float-left m-2'>{collectedValue} MATIC collected out of {targetAmountValue} MATIC target.</p>
          <div className='flex flex-row w-[220px]'>
            <Button onClick={() => { if (externalLink !== '') { window.location.assign(externalLink) } else { alert('No external URL available.') } }} shape='round' style={{ display: 'flex' }} className='m-2 w-[100px] flex flex-1 items-center justify-center rounded-xl'>Link <LinkOutlined /></Button>
            <Button onClick={() => {
              navigator.clipboard.writeText(window.location.host + '/' + address + '/' + (id));
              toast('Link copied to clipboard');
            }} shape='round' style={{ display: 'flex' }} className='m-2 w-[100px] flex flex-1 items-center justify-center rounded-xl'>Share <ShareAltOutlined /></Button>
          </div>
          {
            showDonate ? <div className='flex flex-row w-[220px] justify-center items-center'>
              <Input type="text" value={donateAmount} onChange={(e) => setDonateAmount(e.target.value)} className='h-[30px] rounded-xl' />
              <Button onClick={() => {
                onDonate(donateAmount)
              }} type='primary' shape='round' style={{ display: 'flex' }} className='m-2 w-[100px] flex flex-1 items-center justify-center rounded-xl'>Donate <GiftOutlined /></Button>
            </div> : <div></div>
          }

          <Row>
            <Col span={18}>
              <p className='text-lg flex float-left text-justify m-2'>
                {description}
              </p>
            </Col>
            <Col className='ml-1' span={5}>
              <img className='w-full rounded-xl shadow-xl' src={image} />
            </Col>
          </Row>
        </Layout>
      </Layout>
    </>
  );
}

export default Details