import { Chain } from 'wagmi'

export const hardh = {
  id: 1337,
  name: 'Hardhat Network',
  network: 'hardhat',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['http://127.0.0.1:8545/'] },
    default: { http: ['http://127.0.0.1:8545/'] },
  },
  blockExplorers: {
    etherscan: { name: 'SavageExplorer', url: 'https://explorer.neonsavagestudios.com/' },
    default: { name: 'SavageExplorer', url: 'https://explorer.neonsavagestudios.com/' },
  },
} as const satisfies Chain
