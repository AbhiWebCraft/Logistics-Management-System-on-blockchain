require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      chainId: 31337, // Chain ID for local network
    },
    localhost: {
      url: "http://127.0.0.1:8545", // Default URL for local Hardhat network
      chainId: 31337,
    },
  },
};
