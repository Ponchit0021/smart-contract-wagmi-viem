// import "@/styles/globals.css";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { EthereumClient, w3mProvider } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { useEffect, useState } from "react";

import { hardh } from '../../custom-chain';

if (!process.env.NEXT_PUBLIC_WC_PROJECT_ID) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}
const wcProjectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID;

// 2. Configure wagmi client
const chains = [hardh];

const { publicClient } = configureChains(chains, [w3mProvider({ wcProjectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  // connectors: w3mConnectors({ version: 1, chains, projectId }),
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: wcProjectId,
      },
    }),
  ],
  publicClient,
});

// 3. Configure modal ethereum client
const ethereumClient = new EthereumClient(wagmiConfig, chains);

export default function App({ Component, pageProps }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);


  return (
    <>
    {ready ? (
        <WagmiConfig config={wagmiConfig}>
          <Component {...pageProps} />
        </WagmiConfig>
    ) : null}
    <Web3Modal projectId={wcProjectId} ethereumClient={ethereumClient} />
  </>
  );
}
