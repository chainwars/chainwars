// const fs = require('fs');
// const HDWalletProvider = require('@truffle/hdwallet-provider');
// const mnemonic = fs.readFileSync(".mnemonic").toString().trim();

module.exports = {
  networks: {
    // development: {
    //  host: "127.0.0.1",     // Localhost (default: none)
    //  port: 8545,            // Standard Ethereum port (default: none)
    //  network_id: "*",       // Any network (default: none)
    // },
    // ropsten: {
    // provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/YOUR-PROJECT-ID`),
    // network_id: 3,       // Ropsten's id
    // gas: 5500000,        // Ropsten has a lower block limit than mainnet
    // confirmations: 2,    // # of confs to wait between deployments. (default: 0)
    // timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
    // skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    // },
    // live: {
    // provider: () => new HDWalletProvider(mnemonic, `https://mainnet.infura.io/v3/YOUR-PROJECT-ID`),
    // network_id: 1,       // Ropsten's id
    // gas: 8000000,        // Ropsten has a lower block limit than mainnet
    // confirmations: 1,    // # of confs to wait between deployments. (default: 0)
    // timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
    // skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    // },
  },

  compilers: {
    solc: {
      version: "0.8.7",
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: false,
         runs: 200000
       },
      }
    }
  },

  plugins: ["solidity-coverage"],
};
