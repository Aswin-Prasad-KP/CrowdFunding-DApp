// const { ethers } = require("hardhat");

// async function main() {
//   // Get signers (owner and participant)
//   const [owner, participant] = await ethers.getSigners();
  
//   // Deploy the contract (if not already deployed)
//   const goal = ethers.parseEther("10"); // 10 ETH goal
//   const duration = 604800; // 1 week in seconds
//   const Crowdfunding = await ethers.getContractFactory("Crowdfunding");
  
//   const crowdfunding = await Crowdfunding.deploy(goal, duration);
//   await crowdfunding.waitForDeployment;
//   console.log("Crowdfunding contract deployed to:", crowdfunding.runner.address);

//   // 1. Participant donates 1 ETH
//   console.log("Participant contributing 1 ETH...");
//   const donateTx = await crowdfunding.connect(participant).contribute({
//     value: ethers.parseEther("1"),
//   });
//   await donateTx.wait();
//   console.log("Participant donated 1 ETH.");

//   // 2. View raised amount
//   const raisedAmount = await crowdfunding.raisedAmount();
//   console.log("Amount raised so far:", ethers.formatEther(raisedAmount));

//   // 3. Check if goal is reached
//   if (raisedAmount >= goal) {
//     console.log("Goal reached! Organizer can withdraw the funds.");
//   } else {
//     console.log("Goal not reached. Participants can request refunds.");
//   }

//   // 4. Organizer withdraws if goal is met
//   if (raisedAmount >= goal) {
//     console.log("Organizer withdrawing funds...");
//     const withdrawTx = await crowdfunding.connect(owner).withdraw();
//     await withdrawTx.wait();
//     console.log("Funds withdrawn by the organizer.");
//   }

//   // 5. Participant can refund if the goal is not met
//   if (raisedAmount < goal) {
//     console.log("Participant requesting a refund...");
//     const refundTx = await crowdfunding.connect(participant).refund();
//     await refundTx.wait();
//     console.log("Refund successfully processed for the participant.");
//   }
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

const { ethers } = require("hardhat");

async function main() {
  // Get signers (owner and participant)
  const [owner, participant] = await ethers.getSigners();

  // Deploy the contract (if not already deployed)
  const goal = ethers.parseEther("10"); // 10 ETH goal
  const duration = 604800; // 1 week in seconds
  const Crowdfunding = await ethers.getContractFactory("Crowdfunding");
  const crowdfunding = await Crowdfunding.deploy(goal, duration);
  await crowdfunding.waitForDeployment;
  console.log("Crowdfunding contract deployed to:", crowdfunding.address);

  // 1. Participant donates 1 ETH
  console.log("Participant contributing 1 ETH...");
  const donateTx = await crowdfunding.connect(participant).contribute({
    value: ethers.parseEther("10"),
  });
  await donateTx.wait();
  console.log("Participant donated 1 ETH.");

  // 2. View raised amount
  const raisedAmount = await crowdfunding.raisedAmount();
  console.log("Amount raised so far:", ethers.formatEther(raisedAmount));

  // 3. Check if goal is reached
  if (raisedAmount >= goal) {
    console.log("Goal reached! Organizer can withdraw the funds.");
  } else {
    console.log("Goal not reached. Participants can request refunds.");
  }

  // 4. Simulate the passing of time by increasing the block timestamp
  console.log("Simulating the passing of time...");
  await ethers.provider.send("evm_increaseTime", [duration + 1]); // Add some time to ensure campaign ends
  await ethers.provider.send("evm_mine", []); // Mine the next block

  // 5. Participant can refund if the goal is not met
  if (raisedAmount < goal) {
    console.log("Participant requesting a refund...");
    const refundTx = await crowdfunding.connect(participant).refund();
    await refundTx.wait();
    console.log("Refund successfully processed for the participant.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
