require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545", // Ganache's RPC URL
      accounts: [
        "0x8f8753f3e23447b7829d232868a15da04e68d01c90d70dbeda48230d1626b4a1",
        "0x7f170a5ecc80075cb9ba195f02387e3c366a7ec30cff0847bad6dd3cb0c747d7",
        "0x1a4ddd1b2edcecf5dd64a47db72a73561c0fd04670016c2709984acffa4fcc0b",
      ] // Replace with your Ganache account private key
    }
  }
};
