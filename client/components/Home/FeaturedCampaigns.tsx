import { Button, List, Card, Row, Col } from 'antd'
import campaings from './campaigns.json'
import Link from 'next/link'

type FeaturedCampaignsProps = {
  showFull: boolean
}

const { Meta } = Card

const FeaturedCampaigns = (props: FeaturedCampaignsProps) => {

  const { showFull } = props;
  const data = showFull ? campaings.data : campaings.data.slice(0, 3)

  const renderItems = () => {
    return data.map(
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
    )
  }

  return <>
    <div className={`flex overflow-hidden ${(showFull ? '' : 'lg:ml-10 rounded-tl-[120px] lg:rounded-bl-[120px]')} bg-gradient-to-b from-purple-500 to-pink-400 flex-col items-center lg:min-h-[70vh] lg:flex-row justify-center ${showFull ? '' : 'lg:justify-start'}`}>
      <div className={`flex ml-10 flex-col lg:mr-10 items-center ${showFull ? '' : 'lg:items-start'} mt-5 mb-5`}>
        <h2 className={`text-6xl leading-relaxed text-white text-center ${showFull ? 'font-bold' : 'lg:text-left'}`}>
          Featured <br /> Campaigns
        </h2>
        <p className={`text-white text-xl max-w-xl ${showFull ? 'text-center' : 'lg:max-w-xs'}`}>Hand-picked campaigns relevant to the current cause and needs. Donate today, support the cause and earn GFT rewards.</p>
        {!showFull ? <Link href={'/campaigns'}><Button className='w-4/5 drop-shadow-lg ml-2 text-white' size='large' shape='round' type='default'>View All</Button></Link> : null}
      </div>
      {!showFull ? <Row
        style={{ marginTop: '20px', marginLeft: 10, marginRight: 10 }}
        className='flex justify-center'
      >
        {renderItems()}
      </Row> : null}
    </div>
    {showFull ? <Col
      style={{ marginTop: '20px', marginLeft: 10, marginRight: 10 }}
      className='flex justify-center'
    >
      {renderItems()}
    </Col> : null}
  </>
}

export default FeaturedCampaigns
