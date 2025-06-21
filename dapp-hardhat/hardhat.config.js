// require("@nomiclabs/hardhat-ethers");
// require("dotenv").config();

// module.exports = {
//   solidity: "0.8.28", // match the version used in the contract
//   networks: {
//     sepolia: {
//       url: process.env.SEPOLIA_RPC_URL,
//       accounts: [process.env.PRIVATE_KEY],
//     },
//     mumbai: {
//       url: process.env.MUMBAI_RPC_URL,
//       accounts: [process.env.PRIVATE_KEY],
//     },
//   },
// };


require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.20",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },
};

