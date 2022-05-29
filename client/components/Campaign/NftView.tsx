import Image from 'next/image'

type NFTViewProps = {
  nft: object
}

const NFTView = ({ nft }: NFTViewProps) => {

  const nftLink = (str: string) => (
    (str.includes('ipfs://')) ? str.replace('ipfs://', 'https://ipfs.io/ipfs/') : str
  )

  console.log(nftLink((nft as any)['image']) as string)
  return <div>
    <div className='flex flex-col items-center justify-center'>
      <img className='max-h-[300px]' src={nftLink((nft as any)['image']) as string} />
    </div>
  </div>
}

export default NFTView
