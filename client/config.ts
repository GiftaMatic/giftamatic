export let NETWORK = 'testnet';
export const NETWORK_ID = '80001';

export const isMainnet = () => NETWORK == 'mainnet'

export const alchemyUrl = `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`;

export const smartContractAddress = '0x4c8d503b500F7C0a2E2b937206b9b96670169fbe'

export const giftTokenContractAddress = '0x9d7a087Ba0a0978e5101d831E9193d492B073Ff6'

export const ipfsToken = process.env.NEXT_PUBLIC_IPFS_TOKEN ?? ''
