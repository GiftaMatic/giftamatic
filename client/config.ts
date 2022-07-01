export let NETWORK = 'testnet';
export const NETWORK_ID = '80001';

export const isMainnet = () => NETWORK == 'mainnet'

export const alchemyUrl = `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`;

export const smartContractAddress = '0xdbfB96424595A1112f384aF2a8C1975C7f1a9a1E'

export const giftTokenContractAddress = '0x0Bf0775017A20477498b58a86823f548dB7eda4C'

export const ipfsToken = process.env.NEXT_PUBLIC_IPFS_TOKEN ?? ''
