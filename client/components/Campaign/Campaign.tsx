import { LogoutOutlined, PlusCircleOutlined, RightOutlined } from "@ant-design/icons"
import { Layout } from "antd"
import { BigNumber } from "ethers"
import { useState, useEffect } from 'react'
import Details from "../Campaign/Details"


const Campaign = ({ arr }: { arr: any }) => {

  const [selectedIndex, setSelectedIndex] = useState(0)
  const { Sider, Header, Footer, Content } = Layout;

  // const [selected, setSelected] = useState({
  //   "name": undefined,
  //   "desc": undefined,
  //   "date": undefined,
  //   "collectedAmount": undefined,
  //   "targetAmount": undefined,
  // })

  return (
    <div className="h-full" >

      <Layout className="h-full bg-white">
        <Sider width={280} theme="light">
          {
            arr.map((elem: any, index: any) => {
              const isRunning = BigNumber.from(elem.collectedAmount).sub(elem.targetAmount).isNegative()
              return (<div className={`h-18 m-2 border-1 rounded-lg flex justify-between p-2 items-center shadow-md hover:bg-stone-200 cursor-pointer ${selectedIndex == index ? 'bg-red-100' : ''}`} onClick={() => setSelectedIndex(index)} key={index}>
                <div className="max-w-[200px]">
                  <div className="max-w-sm overflow-hidden whitespace-nowrap mt-1 mb-0 text-ellipsis font-bold">{elem.title}</div>
                  <p className={`flex text-stone-400 float-left font-bold justify-center content-center ml-0 mt-0.5 text-xs ${isRunning ? 'text-red-600' : 'text-green-600'}`}>{isRunning ? 'Running' : 'Completed'}</p>
                </div>
                <RightOutlined className="ml-4 m-2" />
              </div>)
            })
          }
        </Sider>
        <Layout className="rounded-lg h-full" >
          <Content className="h-full bg-transparent m-5 text-6xl text-center rounded-lg">
            {
              (arr.length === 0) ? <div className="flex justify-center content-center">
                <p> You dont have any campaigns! </p>
              </div> :
                <Details name={arr[selectedIndex].title} collectedAmount={arr[selectedIndex].collectedAmount} targetAmount={arr[selectedIndex].targetAmount} description={arr[selectedIndex].description}
                  image={arr[selectedIndex].image} />
            }
          </Content>
        </Layout>
      </Layout>

    </div>
  )
}



export default Campaign