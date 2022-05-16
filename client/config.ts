export let NETWORK = 'testnet';
export const NETWORK_ID = '80001';

export const isMainnet = () => NETWORK == 'mainnet'

export const alchemyUrl = `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`;
