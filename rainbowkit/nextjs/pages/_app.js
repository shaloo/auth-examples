import '@/styles/globals.css'
import "@rainbow-me/rainbowkit/styles.css";
import {
  ConnectButton,
  connectorsForWallets,
  RainbowKitProvider
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import { polygon, mainnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import { ArcanaConnector } from "@arcana/auth-wagmi";

const ArcanaRainbowConnector = ({ chains }) => {
  return {
    id: "arcana-auth",
    name: "Arcana Wallet",
    iconUrl: "",
    iconBackground: "#101010",
    createConnector: () => {
      const connector = new ArcanaConnector({
        chains,
        options: {
	  appId: "xar_test_b2dde12aad64eb35d72b2c80926338e178b1fa3f",
        },
      });
      return {
        connector,
      };
    },
  };
};

const connectors = (chains) =>
  connectorsForWallets([
    {
      groupName: "Recommended",
      wallets: [ArcanaRainbowConnector({ chains }), metaMaskWallet({ chains })],
    },
  ]);

const { chains, provider } = configureChains(
  [mainnet, polygon],
  [publicProvider()]
);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: connectors(chains),
  provider,
});

export default function App({ Component, pageProps }) {
  return(
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
	          <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <ConnectButton />
        </div>
	<Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
