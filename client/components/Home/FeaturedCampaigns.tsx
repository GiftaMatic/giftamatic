import { Button, List, Card, Row } from 'antd'
import campaings from './campaigns.json'
import Link from 'next/link'

const { Meta } = Card

const FeaturedCampaigns = () => {
  return <div className='flex overflow-hidden lg:ml-10 rounded-tl-[120px] lg:rounded-bl-[120px] bg-gradient-to-b from-purple-500 to-pink-400 flex-col items-center lg:min-h-[70vh] lg:flex-row justify-center lg:justify-start'>
    <div className='flex ml-10 flex-col lg:mr-10 items-center lg:items-start mt-5 mb-5'>
      <h2 className='text-6xl leading-relaxed text-white text-center lg:text-leftf'>
        Featured <br /> Campaigns
      </h2>
      <p className='text-white text-xl max-w-xl lg:max-w-xs'>Hand-picked campaigns relevant to the current cause and needs. Donate today, support the cause and earn GFT rewards.</p>
      <Button className='w-4/5 drop-shadow-lg ml-2 text-white' size='large' shape='round' type='default'>View All</Button>
    </div>
    <Row
      style={{ marginTop: '20px', marginLeft: 10, marginRight: 10 }}
      className='flex justify-center'
    >
      {campaings.data.map(
        item => (
          <List.Item key={item.description} className='mx-1'>
            <Card
              className='w-80 rounded-xl'
              cover={
                <img
                  style={{ height: '200px', objectFit: 'cover' }}
                  alt={item.title}
                  src={item.image}
                />
              }
              actions={[
                <Link href={item.address}>
                  <Button type='link'>View Details</Button>
                </Link>,
                <Link href={item.address}>
                  <Button type='primary'>Donate</Button>
                </Link>
              ]}
            >
              <Meta
                title={item.title}
                description={item.description.slice(0, 100) + (item.description.length > 100 ? '...' : '')}
                style={{ textAlign: 'justify' }}
              />
            </Card>
          </List.Item>
        )
      )}
    </Row>
  </div>
}

export default FeaturedCampaigns
