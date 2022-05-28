export let NETWORK = 'testnet';
export const NETWORK_ID = '80001';

export const isMainnet = () => NETWORK == 'mainnet'

export const alchemyUrl = `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`;

export const smartContractAddress = '0x4D6653da4c99969285317F976cF07F268ddF1B6D'

export const giftTokenContractAddress = '0x1A4e6D3E6561df432cc7603E5F7415651191B532'
