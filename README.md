# Crowdfunding DApp

A decentralized crowdfunding platform built with **Solidity**, **Hardhat**, and **Ethers.js**. This DApp allows participants to donate funds to a project and request refunds if the goal is not reached. The organizer can withdraw the funds once the goal is met.

## Features

- **Contribute**: Participants can donate a specified amount of Ether to the crowdfunding campaign.
- **Refund**: If the goal is not reached by the end of the campaign, participants can request a refund.
- **Withdraw Funds**: Once the goal is reached, the organizer can withdraw the funds.

## Tech Stack

- **Solidity**: Smart contracts for the crowdfunding platform.
- **Hardhat**: Ethereum development environment for deploying and interacting with smart contracts.
- **Ethers.js**: A library to interact with the Ethereum blockchain in JavaScript.

## Project Structure

- `contracts/`: Contains the smart contract `Crowdfunding.sol`.
- `scripts/`: Contains the deployment (`deploy.js`) and interaction (`interactor.js`) scripts.
- `test/`: Unit tests for the smart contract (optional, not yet implemented in this example).
- `contractAddress.json`: Stores the deployed contract address for interacting with the DApp.

## Setup and Installation

### Prerequisites

Make sure you have the following tools installed:

- **Node.js** (v16 or higher) - [Install Node.js](https://nodejs.org/)
- **Hardhat** - Ethereum development framework - [Install Hardhat](https://hardhat.org/getting-started/)
- **MetaMask** or any Ethereum wallet (for interacting with the contract on a test network or the mainnet).

### 1. Clone the repository

```bash
git clone https://github.com/your-username/crowdfunding-dapp.git
cd crowdfunding-dapp
```

### 2. Install dependencies

Install the required dependencies using npm:

```bash
npm install
```

### 3. Configure Hardhat

Ensure that your `hardhat.config.js` is configured with the appropriate network details. For example, using Hardhat's built-in network or a test network like Rinkeby or Goerli.

```js
module.exports = {
  solidity: "0.8.18",
  networks: {
    hardhat: {},
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID`,
      accounts: [`0x${YOUR_PRIVATE_KEY}`]
    }
  }
};
```

Replace `YOUR_INFURA_PROJECT_ID` with your Infura API key and `YOUR_PRIVATE_KEY` with the private key of your Ethereum wallet.

### 4. Deploy the contract

Run the deployment script to deploy the crowdfunding contract to the network. This will generate the contract address and store it in `contractAddress.json`.

```bash
node scripts/deploy.js
```

This will deploy the contract and print the deployed contract address to the console, and it will also save the address in `contractAddress.json`.

### 5. Interact with the contract

Once the contract is deployed, you can use the `interactor.js` script to interact with the deployed contract. This includes actions like donating, withdrawing, and refunding.

#### Example: Run the interactor script

```bash
node scripts/interactor.js
```

In this script:
- A participant donates 1 ETH to the crowdfunding campaign.
- The amount raised so far is checked.
- If the goal is reached, the organizer can withdraw the funds.
- If the goal is not reached by the end of the campaign, participants can request a refund.

### 6. Simulate Campaign Expiry

The interaction script will simulate the passage of time to test the refund functionality. If the goal is not met by the end of the campaign, participants can request a refund. Otherwise, the organizer can withdraw the funds once the goal is reached.

### 7. Contract Functions

The smart contract exposes the following functions for interaction:

- **contribute()**: Allows participants to donate Ether to the campaign.
- **refund()**: Allows participants to refund their donation if the goal is not reached by the campaign's end.
- **withdraw()**: Allows the organizer to withdraw the funds if the goal is met.

---

## Smart Contract: `Crowdfunding.sol`

Here’s a brief overview of the contract:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Crowdfunding {
    address public organizer;
    uint256 public goal;
    uint256 public raisedAmount;
    uint256 public deadline;
    mapping(address => uint256) public contributions;

    constructor(uint256 _goal, uint256 _duration) {
        organizer = msg.sender;
        goal = _goal;
        deadline = block.timestamp + _duration;
    }

    function contribute() external payable {
        require(block.timestamp < deadline, "Campaign has ended");
        contributions[msg.sender] += msg.value;
        raisedAmount += msg.value;
    }

    function refund() external {
        require(block.timestamp > deadline, "Campaign is still active");
        require(raisedAmount < goal, "Goal was reached, no refunds allowed");

        uint256 contribution = contributions[msg.sender];
        require(contribution > 0, "You have no contribution to refund");

        contributions[msg.sender] = 0;
        payable(msg.sender).transfer(contribution);
    }

    function withdraw() external {
        require(msg.sender == organizer, "Only the organizer can withdraw");
        require(block.timestamp > deadline, "Campaign is still active");
        require(raisedAmount >= goal, "Goal not reached, cannot withdraw");

        payable(organizer).transfer(raisedAmount);
    }
}
```

### Contract Variables:
- `organizer`: Address of the organizer who can withdraw the funds.
- `goal`: The fundraising goal in Wei.
- `raisedAmount`: The total amount raised so far.
- `deadline`: The timestamp for the end of the campaign.

### Functions:
- **contribute()**: Allows users to contribute funds to the campaign.
- **refund()**: Allows users to request a refund if the campaign didn’t meet its goal.
- **withdraw()**: Allows the organizer to withdraw the funds after the goal is met.

---

## License

This project is licensed under the MIT License.

---

### Conclusion

By following the above steps, you can easily deploy and interact with the crowdfunding contract. Participants can donate, and organizers can withdraw funds when the goal is met, while refunds are allowed if the goal is not reached.
