// // // const { ethers } = require("hardhat");

// // // async function main() {
// // //   // Get the contract factory
// // //   const SimpleStorage = await ethers.getContractFactory("SimpleStorage");

// // //   console.log("Deploying SimpleStorage contract...");

// // //   // Deploy the contract
// // //   const simpleStorage = await SimpleStorage.deploy();
  
// // //   // Wait for the deployment to be mined (transaction confirmation)
// // //   await simpleStorage.deployTransaction.wait();

// // //   console.log("SimpleStorage contract deployed to:", simpleStorage.address);

// // //   // Interact with the contract: set a value
// // //   const setValueTx = await simpleStorage.set(42);
// // //   await setValueTx.wait();  // wait for the transaction to be mined
// // //   console.log("Value set to 42");

// // //   // Interact with the contract: get the stored value
// // //   const storedData = await simpleStorage.get();
// // //   console.log("Stored data is:", storedData.toString());  // converts to string for easy logging
// // // }

// // // main().catch((error) => {
// // //   console.error(error);
// // //   process.exitCode = 1;
// // // });


// // const { ethers } = require("hardhat");

// // async function main() {
// //   // Get the contract factory
// //   const SimpleStorage = await ethers.getContractFactory("SimpleStorage");

// //   console.log("Deploying SimpleStorage contract...");

// //   // Deploy the contract
// //   const simpleStorage = await SimpleStorage.deploy();
  
// //   // Wait for the contract deployment to be mined (transaction confirmation)
// //   await simpleStorage.waitForDeployment
// //   console.log("SimpleStorage contract deployed to:", simpleStorage.runner.address);

// //   // Interact with the contract: set a value
// //   const setValueTx = await simpleStorage.set(42);
// //   await setValueTx.wait();  // Wait for the transaction to be mined

// //   console.log("Value set to 42");

// //   // Interact with the contract: get the stored value
// //   const storedData = await simpleStorage.get();
// //   console.log("Stored data is:", storedData.toString());  // Converts to string for easy logging
// // }

// // main().catch((error) => {
// //   console.error(error);
// //   process.exitCode = 1;
// // });


// const { ethers } = require("hardhat");

// async function main() {
//   // Get contract factory for Crowdfunding
//   const goal = ethers.parseEther("10"); // 10 ETH goal
//   const duration = 604800; // 1 week in seconds
//   const Crowdfunding = await ethers.getContractFactory("Crowdfunding");

//   console.log("Deploying Crowdfunding contract...");
//   const crowdfunding = await Crowdfunding.deploy(goal, duration);
//   await crowdfunding.waitForDeployment;
//   console.log("Crowdfunding contract deployed to:", crowdfunding.runner.address);
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });


const { ethers } = require("hardhat");

async function main() {
  // Get signers (owner and participants)
  const [owner] = await ethers.getSigners();

  // Define crowdfunding goal and duration
  const goal = ethers.parseEther("10"); // Goal: 10 ETH
  const duration = 604800; // Duration: 1 week (in seconds)

  // Get the Crowdfunding contract factory
  const Crowdfunding = await ethers.getContractFactory("Crowdfunding");

  // Deploy the contract
  const crowdfunding = await Crowdfunding.deploy(goal, duration);
  await crowdfunding.waitForDeployment;

  console.log("Crowdfunding contract deployed to:", crowdfunding.runner.address);
  
  // Save the contract address to a JSON file so that it can be used by interactor.js
  const fs = require("fs");
  const contractAddress = { address: crowdfunding.target };
  fs.writeFileSync("contractAddress.json", JSON.stringify(contractAddress));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
