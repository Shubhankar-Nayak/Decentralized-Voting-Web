import { HardhatUserConfig } from "hardhat/config";
import "@typechain/hardhat";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config()

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  typechain: {
    outDir: "typechain-types",
    target: "ethers-v6", 
  },
  networks: {
    sepolia: {
      url: process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || "",
      accounts: process.env.NEXT_PUBLIC_PRIVATE_KEY ? [`0x${process.env.NEXT_PUBLIC_PRIVATE_KEY}`] : [],
    },
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY || "",
    },
  }
};

export default config;
