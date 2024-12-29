// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Crowdfunding {
    address public owner;
    uint256 public goal;
    uint256 public raisedAmount;
    uint256 public endTime;

    mapping(address => uint256) public contributions;

    event ContributionReceived(address contributor, uint256 amount);
    event GoalReached(uint256 totalAmountRaised);
    event Withdrawn(address owner, uint256 amount);
    event Refund(address contributor, uint256 amount);

    constructor(uint256 _goal, uint256 _durationInSeconds) {
        owner = msg.sender;
        goal = _goal;
        raisedAmount = 0;
        endTime = block.timestamp + _durationInSeconds;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
    }

    modifier hasEnded() {
        require(block.timestamp > endTime, "Crowdfunding has not ended yet.");
        _;
    }

    modifier goalNotReached() {
        require(raisedAmount < goal, "Goal already reached.");
        _;
    }

    modifier goalReached() {
        require(raisedAmount >= goal, "Goal not reached yet.");
        _;
    }

    // Contribute to the crowdfunding project
    function contribute() external payable goalNotReached {
        require(block.timestamp < endTime, "Crowdfunding has ended.");
        contributions[msg.sender] += msg.value;
        raisedAmount += msg.value;

        emit ContributionReceived(msg.sender, msg.value);

        // Check if the goal is reached
        if (raisedAmount >= goal) {
            emit GoalReached(raisedAmount);
        }
    }

    // Withdraw funds after the campaign ends (if goal is reached)
    function withdraw() external onlyOwner hasEnded goalReached {
        uint256 amount = raisedAmount;
        raisedAmount = 0;
        payable(owner).transfer(amount);

        emit Withdrawn(owner, amount);
    }

    // Refund contributors if the goal is not reached by the end time
    function refund() external hasEnded goalNotReached {
        uint256 amount = contributions[msg.sender];
        require(amount > 0, "No contributions to refund.");
        contributions[msg.sender] = 0;
        payable(msg.sender).transfer(amount);

        emit Refund(msg.sender, amount);
    }
}
