import React from 'react'
import { Layout} from "antd"
import { RightOutlined  } from "@ant-design/icons"
import ProgressBar from "../Campaign/ProgressBar"

const Details  =  ({name, desc, collectedAmount, targetAmount, }: {name: any, desc:any, collectedAmount:any, targetAmount:any, }
    ) => {
    
    const { Header, Footer, Content, Sider} = Layout;
    const progress = (parseInt('collectedAmount') / parseInt('targetAmount') * 100);

    return (
        <>
        <Layout> 
            <Layout>

            <Header>
                <h1> {name} </h1>
                <ProgressBar bgcolor="red" progress={progress} height={25}/>
            </Header>
            <Content> {desc}</Content>
            </Layout>
            <Sider> <RightOutlined/></Sider>
        </Layout>
        </>
    );
}

export default Details