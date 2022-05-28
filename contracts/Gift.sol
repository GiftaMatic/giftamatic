// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./GiftToken.sol";

contract Gift {
    enum NFTGiftState {
        LISTED,
        EXPIRED,
        SOLD
    }

    struct Campaign {
        string title;
        string description;
        uint256 targetAmount;
        uint256 collectedAmount;
        string image;
        string externalLink;
    }
    struct NFTGift {
        NFTGiftState status;
        address contractAddress;
        uint256 tokenId;
        address prevOwner;
        uint256 price;
        address campaignCreator;
        uint256 campaignId;
    }

    NFTGift[] public nftGifts;
    mapping(address => Campaign[]) private campaigns;

    GiftToken private token;

    event CampaignCreated(
        address indexed creator,
        string title,
        string description,
        uint256 targetAmount,
        uint256 collectedAmount,
        string image,
        string externalLink
    );

    constructor(GiftToken _token) {
        token = _token;
    }

    function createCampaign(
        string calldata _title,
        string calldata _description,
        uint256 _targetAmount,
        string calldata _image,
        string calldata _externalLink
    ) public {
        require(_targetAmount > 0, "Target amount should be greater than 0");

        Campaign memory newCampaign = Campaign(
            _title,
            _description,
            _targetAmount,
            0,
            _image,
            _externalLink
        );

        campaigns[msg.sender].push(newCampaign);
        emit CampaignCreated(
            msg.sender,
            _title,
            _description,
            _targetAmount,
            0,
            _image,
            _externalLink
        );
    }

    function getCampaignsByCreator(address _creator)
        public
        view
        returns (Campaign[] memory)
    {
        return campaigns[_creator];
    }

    function getCampaign(address _creator, uint256 index)
        public
        view
        returns (Campaign memory)
    {
        require(campaigns[_creator].length != 0, "No campaigns found");
        require(index < campaigns[_creator].length, "Index out of bounds");
        return campaigns[_creator][index];
    }

    function gift(address _creator, uint256 index) public payable {
        require(msg.sender != _creator, "You cannot gift to yourself");
        require(campaigns[_creator].length != 0, "No campaigns found");
        require(index < campaigns[_creator].length, "Index out of bounds");

        Campaign memory campaign = campaigns[_creator][index];

        require(
            campaign.collectedAmount + msg.value < campaign.targetAmount,
            "Campaign is already reached it's target amount."
        );

        require(
            msg.value <= campaign.targetAmount - campaign.collectedAmount,
            "Donation is larger than the remaining target amount."
        );

        (bool success, ) = _creator.call{value: msg.value}("");
        require(success, "Failed to transfer gift amount");
        campaign.collectedAmount += msg.value;

        campaigns[_creator][index] = campaign;
        token.mint(msg.sender, msg.value);
    }

    function claimBackNFT(uint256 _index) public payable {
      require(_index < nftGifts.length, "NFT doesn't exists!");

      NFTGift memory nft = nftGifts[_index];

      require(nft.prevOwner == msg.sender, "You were not the owner of this nft");
      require(nft.status != NFTGiftState.SOLD, "NFT is already donated");

      ERC721 nftContract = ERC721(nft.contractAddress);
      
      nftContract.transferFrom(address(this), nft.prevOwner, nft.tokenId);

      nft.status = NFTGiftState.EXPIRED;
      nftGifts[_index] = nft;
    }

    function buyNFT(uint256 _index) public payable {
        require(_index < nftGifts.length, "NFT doesn't exists!");
        require(
            nftGifts[_index].status == NFTGiftState.LISTED,
            "NFT is not listed"
        );
        require(nftGifts[_index].price <= msg.value, "Gift is too expensive");

        Campaign memory campaign = campaigns[nftGifts[_index].campaignCreator][
            nftGifts[_index].campaignId
        ];
        require(
            campaign.collectedAmount < campaign.targetAmount,
            "Campaign is already reached it's target amount."
        );

        // Transferring the NFT.
        ERC721 nft = ERC721(nftGifts[_index].contractAddress);
        nft.transferFrom(address(this), msg.sender, nftGifts[_index].tokenId);

        // Transferring the gift amount.
        (bool success, ) = nftGifts[_index].campaignCreator.call{
            value: msg.value
        }("");
        require(success, "Failed to transfer gift amount");

        // Updating the collectedAmount in the campaign.
        campaign.collectedAmount += msg.value;
        campaigns[nftGifts[_index].campaignCreator][
            nftGifts[_index].campaignId
        ] = campaign;

        // Minting GFT tokens for the NFT seller.
        token.mint(nftGifts[_index].prevOwner, msg.value);

        // Minting GFT tokens for the NFT buyer (1% of the buy amount).
        token.mint(nftGifts[_index].prevOwner, msg.value / 100);

        // The NFT is sold.
        nftGifts[_index].status = NFTGiftState.SOLD;
    }

    function donateNFT(
        address _nftContractAddress,
        uint256 _tokenId,
        uint256 _price,
        address _campaignCreator,
        uint256 _campaignIndex
    ) public payable {
        // Check if the campaign exists and still open.
        require(
            campaigns[_campaignCreator].length != 0 ||
                _campaignIndex < campaigns[_campaignCreator].length,
            "Campaign does not exists."
        );

        Campaign memory campaign = campaigns[_campaignCreator][_campaignIndex];
        require(
            campaign.collectedAmount < campaign.targetAmount,
            "Campaign is already reached it's target amount."
        );

        ERC721 nft = ERC721(_nftContractAddress);
        require(
            nft.ownerOf(_tokenId) == msg.sender,
            "You are not the owner of this token"
        );

        require(
            nft.getApproved(_tokenId) == address(this),
            "Please approve the contract to access your NFT before donating"
        );

        // Transfer the NFT to self.
        nft.transferFrom(msg.sender, address(this), _tokenId);

        // Add to nft auctions array.
        NFTGift memory nftGift = NFTGift(
            NFTGiftState.LISTED,
            _nftContractAddress,
            _tokenId,
            msg.sender,
            _price,
            _campaignCreator,
            _campaignIndex
        );

        nftGifts.push(nftGift);
    }

    function getNFTMetadata(address _contract, uint256 _tokenId)
        public
        view
        returns (string memory)
    {
        ERC721 nft = ERC721(_contract);
        return nft.tokenURI(_tokenId);
    }
}
