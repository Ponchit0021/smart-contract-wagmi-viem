require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
      gas: 2100000,
      gasPrice: 8000000000,
    },
    savage: {
      url: 'https://bruteserver.com:9503/',
      chainId: 6366,
      accounts: ['b6d474022b86949e170bc8e00d0b4a8eac3fda379911e359d1666973af9f6a7a']
    },
    goerli: {
      url: 'https://goerli.infura.io/v3/5d90cbcf761e4157a88dae05132edb8b',
      chainId: 5,
      accounts: ['b6d474022b86949e170bc8e00d0b4a8eac3fda379911e359d1666973af9f6a7a']
    }
  }
};