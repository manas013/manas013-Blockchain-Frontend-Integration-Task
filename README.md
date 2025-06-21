# 🧮 Counter dApp — React + Hardhat + MetaMask

A simple decentralized application (dApp) built using **React**, **Ethers.js**, and **Hardhat**. This dApp allows users to connect their MetaMask wallet and interact with a basic smart contract to increment a counter stored on the blockchain.

---

## 🔧 Tech Stack

- **Frontend**: React.js, TailwindCSS (optional)
- **Blockchain Interaction**: Ethers.js
- **Smart Contract Platform**: Hardhat (Local Ethereum Network)
- **Wallet**: MetaMask

---

## 🚀 Features

✅ Connect/Disconnect MetaMask  
✅ Show wallet address and network  
✅ Persist wallet state on refresh  
✅ Read contract state (counter value)  
✅ Write to contract (increment counter)  
✅ Listen to network/account changes  
✅ React Context for global wallet state

---


## 🧱 Installation & Setup Guide

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/dapp-counter.git
cd dapp-counter


npm install


cd dapp-hardhat


npm install


npx hardhat node


This runs a local blockchain at http://127.0.0.1:8545.


npx hardhat run scripts/deploy.js --network localhost


4. Add Deployed Contract Address to React App
In src/components/Counter.js, replace the placeholder with the deployed address:

jsCopyEdit
const COUNTER_ADDRESS = "PASTE_YOUR_DEPLOYED_ADDRESS_HERE";



5. Configure MetaMask for Localhost
Open MetaMask → Add Network manually:

Network Name: Hardhat Localhost

New RPC URL: http://127.0.0.1:8545

Chain ID: 31337

Currency Symbol: ETH

Import an account from Hardhat:

Use one of the private keys printed in your terminal when npx hardhat node runs.

Start the React Frontend

npm start

Visit: http://localhost:3000

