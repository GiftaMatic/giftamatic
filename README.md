# 🎁 GiftaMatic - An opensource web3 project to create donation campaigns .

The project allows people to create GiftaMatic Campaigns with a target amount and description. Then, they can generate a sharable link in public and anyone would be able to
donate MATIC from the shared link.

## How it works?

![image](https://user-images.githubusercontent.com/71334544/162606601-f5e8f6bd-f449-4628-9ce2-6a57b5ef83c6.png)

GiftaMatic connects to the [smart contract](./contracts/Gift.sol) deployed on Polygon's Mumbai TestNet which allows both 
 - The fundraisers to easily create campaigns and share them on social media
 - The donaters to trustfully donate to the campaign.

## What problems are we solving? 

GiftAMatic solves the biggest problem of transparency in donations and the middleman's involved in the process. The smart contract deployed on a decentralized network is immuatable and stores the records of transactions.

The amount payed using the application will be transferred to the campaign creator directly. 

Our platform creates a transparency for donation about a donation campaign like it's total amount deposited, address in which the amount is deposited and more.
The total amount raised , deposit address are always known to the donater to ensure the sense of trust

## Our Uniqueness

1) Incentivise the donaters by providing them our own crypto GFT in order to create a win-win situation for both the parties.
   The salient features of this tokens are :
    - These GFTs are non transferable.
    - They go along with the trend of showcasing the social status to the public.
 
2) Making sure the donaters know that the campaign is legitimate.
   We have build a npm package for creating a button that can be integrated in any website. 
   If the donator trust the website that integrated our button, then they will be assured that the campaing is legitimate.   
   

## Running on local machine

Follow the below steps to run the project on your localnet:
- Fork the repository
- Clone the forked repository
- Run `npm install` in the project's root directory
- Update [config.js](./src/config.js) file with your own credentials. 
- Create a local ganache server and publish the [contract](./contracts/Gift.sol) from remix ide to ganache server. And add the smart contract address in config.js file.
- Run `npm start` to start the web application.


## Contributing

We welcome contributions from everyone:

You can contribute to the project in the following way:

- Report an issue related to the project
- Add an enhancement by creating a PR
- Fixing a bug

## Future Ideas
- To create a marketplace for NFT provided by our platform
- The GFTs may be used to trade with the NFTs provides by our platform.
- The NFTs thus sold by the donaters will be the source of our revenue.
