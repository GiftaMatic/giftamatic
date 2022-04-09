import {LogoutOutlined, PlusCircleOutlined,  RightOutlined  } from "@ant-design/icons"
import { Layout} from "antd"
import {useState, useEffect} from 'react'
import Details from "../Campaign/Details"


const Campaign = ({arr}:{arr:any}) => {
  
  const { Sider,Header, Footer, Content} = Layout;

  const [selected, setSelected]= useState({
      "name": undefined,
      "desc": undefined,
      "date": undefined,
      "collectedAmount": undefined,
      "targetAmount": undefined,
  })

  useEffect(()=>{

      if (arr.length!==0){
          setSelected(arr[0])
        }
        
    },[])
  
  return (
    <div className="campaign-container h-4/5 " >
        
     <Layout className="h-full bg-white">
         <Sider theme="light"  >
             {
                 arr.map((elem:any,index:any) => { return (<div className="h-12 m-2 border-2 rounded-lg flex justify-around  border-sky-200 hover:bg-stone-200 hover:border-sky-400 active:border-sky-400 cursor-pointer" onClick={()=>setSelected(elem)}  key={index}>
                        <div >
                            <p className="mt-1 mb-0">{elem["name"]}</p> 
                            <p className="text-stone-400 text-xs">{elem["date"]}</p> 

                        </div>
                        <RightOutlined className="ml-4 m-2"/>
                     </div>)})
             }
         </Sider>
         <Layout className="rounded-lg h-full" >
             <Content className=" h-full bg-stone-100 m-5 text-6xl text-center rounded-lg text-stone-400"> 
                {
                    (arr.length===0) ? <div className="flex justify-center content-center">
                        <p> You dont have any campaigns! </p>
                    </div> :

                    <Details name = {selected["name"]} collectedAmount = {selected["collectedAmount"]} targetAmount = {selected["targetAmount"]} desc = {selected["desc"]}
                    />
                    
                
                }   
             </Content>
        </Layout>
     </Layout>
        
    </div>
  )
}



export default Campaign