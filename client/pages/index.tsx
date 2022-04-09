import { Button, Card, List, Pagination } from 'antd'
import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header/Header'
import About from '../components/Home/About'
import HowItWorks from '../components/Home/HowItWorks'
import Intro from '../components/Home/Intro'

const { Meta } = Card

const Home: NextPage = () => {
  return <div>
    <div className='flex flex-col h-screen'>
      <Head>
        <title>GiftaMatic: Blockchain based Donation Platform</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Tushar Ojha" />
        <meta name="description" content="GiftaMatic is an blockchain based donation platform. It allows people to donate Matic and earn GFT tokens. GFT tokens enables participation in NFTs airdrop and more. Create Donation Campaigns and Donate Matic for the cause." />
      </Head>
      <Header />
      <Intro />
    </div>
    <HowItWorks />
    <About />
    <div className='flex overflow-hidden lg:mt-10 lg:ml-10 rounded-tl-[120px] lg:rounded-bl-[120px] bg-gradient-to-b from-purple-500 to-pink-400 h-full flex-col items-center lg:min-h-[80vh] lg:flex-row justify-center items-center'>
      <div className='flex ml-10 flex-col lg:mr-10 items-center lg:items-start mt-5 mb-5'>
        <h2 className='text-6xl leading-relaxed text-white'>
          Featured <br /> Campaigns
        </h2>
        <p className='text-white text-xl max-w-xl lg:max-w-xs'>Hand-picked campaigns relevant to the current cause and needs. Donate today, support the cause and earn GFT rewards.</p>
        <Button className='w-4/5 drop-shadow-lg ml-2 text-white' size='large' shape='round' type='default'>View All</Button>
      </div>
      <List
        style={{ marginTop: '20px', marginLeft: 10, marginRight: 10}}
        grid={{
          gutter: 10,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 3,
        }}
        dataSource={[{ image: 'https://www.aljazeera.com/wp-content/uploads/2022/02/000_323Y8VE.jpg?resize=770%2C513', title: 'Help Ukraine fight the war', description: 'We the people of Ukraine need your support to stand against the invaders of our country. Help us fight the war.' }, { image: 'https://www.wpexplorer.com/wp-content/uploads/wordpress-best-donation-plugins.jpg', title: 'Support GiftaMatic', description: 'GiftaMatic enables people to create donation campaigns and rewards them with GFT tokens and NFTs.' }]}
        renderItem={item => (
          <List.Item key={item.description} className=''>
            <Card
              className='lg:max-w-[350px] xl:max-w-[450px] lg:pr-[150px]'
              cover={
                <img
                  style={{height: '200px', objectFit: 'cover'}}
                  alt="example"
                  src={item.image}
                />
              }
              actions={[
                <Button type='link'>View Details</Button>,
                <Button type='primary'>Donate</Button>
              ]}
            >
              <Meta
                title={item.title}
                description={item.description}
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  </div>
}

export default Home
