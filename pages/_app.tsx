import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { arbitrum, goerli, mainnet, optimism, polygon } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { NextUIProvider } from "@nextui-org/react";
import Layout from "../components/layout";
import { SSRProvider } from "@react-aria/ssr";

const { chains, provider, webSocketProvider } = configureChains(
  [
    mainnet,
    goerli,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <NextUIProvider>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RainbowKitProvider>
        </WagmiConfig>
      </NextUIProvider>
    </SSRProvider>
  );
}

export default MyApp;
