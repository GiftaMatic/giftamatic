import React from 'react'
import { Layout, Col, Row, Button } from "antd"
import { LinkOutlined, RightOutlined, ShareAltOutlined } from "@ant-design/icons"
import ProgressBar from "../Campaign/ProgressBar"
import { BigNumber, ethers } from 'ethers'

const Details = ({ name, description, collectedAmount, targetAmount, image }: { name: any, description: any, collectedAmount: any, targetAmount: any, image: any }
) => {
  const collectedAmountNumber = ethers.utils.formatEther(collectedAmount)
  const collectedValue = collectedAmountNumber.split('.')[0] + '.' + collectedAmountNumber.split('.')[1].slice(0, 2)
  const targetAmountNumber = ethers.utils.formatEther(targetAmount)
  const targetAmountValue = targetAmountNumber.split('.')[0] + '.' + targetAmountNumber.split('.')[1].slice(0, 2)
  const progress = parseFloat(collectedAmountNumber) / parseFloat(targetAmountNumber) * 100

  return (
    <>
      <Layout className='flex flex-col'>
        <Layout className='w-full h-full'>
          <h2 className='text-3xl flex items-left float-left ml-2'> {name} </h2>
          <div className='ml-2'>
            <ProgressBar bgcolor="red" progress={progress} height={25} />
          </div>
          <p className='text-sm font-bold flex float-left m-2'>{collectedValue} MATIC collected out of {targetAmountValue} ETH target.</p>
          <div className='flex flex-row w-[220px]'>
            <Button shape='round' style={{ display: 'flex' }} className='m-2 w-[100px] flex flex-1 items-center justify-center rounded-xl'>Link <LinkOutlined /></Button>
            <Button shape='round' style={{ display: 'flex' }} className='m-2 w-[100px] flex flex-1 items-center justify-center rounded-xl'>Share <ShareAltOutlined /></Button>
          </div>
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