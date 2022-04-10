// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "./GiftToken.sol";

contract Gift {
    
    struct Campaign {
        string cId;
        uint256 targetAmount;
        uint256 collectedAmount;
    }

    mapping(address => Campaign[]) private campaigns;

    GiftToken private token;

    event CampaignCreated(
        string cId,
        address indexed creator,
        uint256 targetAmount,
        uint256 collectedAmount
    );

    constructor(GiftToken _token) {
        token = _token;
    }

    function createCampaign(
        string calldata cId,
        uint256 _targetAmount
    ) public {
        require(_targetAmount > 0, "Target amount should be greater than 0");

        Campaign memory newCampaign = Campaign(
            // _title,
            // _description,
            cId,
            _targetAmount,
            0
            // _image,
            // _externalLink
        );

        campaigns[msg.sender].push(newCampaign);
        emit CampaignCreated(
            cId,
            msg.sender,
            _targetAmount,
            0
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
}
