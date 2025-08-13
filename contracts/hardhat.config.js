require('@nomiclabs/hardhat-ethers');
require('dotenv').config({ path: '../.env' });

module.exports = {
  solidity: {
    version: '0.8.0',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hedera: {
      url: 'https://testnet.hashio.io/api',
      accounts: process.env.MY_PRIVATE_KEY ? [`0x${process.env.MY_PRIVATE_KEY}`] : [],
      chainId: 296,
      gas: 'auto',
      gasPrice: 'auto',
      timeout: 120000,
    },
  },
};
