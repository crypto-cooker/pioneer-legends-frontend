import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import "../styles/globals.scss";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { ToastContainer } from "react-toastify";
import WalletConnect from "../context/WalletProvider";
import MainLayout from "../components/Layout/MainLayout";
import { ModalProvider } from "../context/ModalProvider";
import ProfileModal from "../components/Modal/ProfileModal";
import DisconnectWalletModal from "../components/Modal/DisconnectWalletModal";
import ShareModal from "../components/Modal/ShareModal";
import AboutModal from "../components/Modal/AboutModal";
import MyWalletModal from "../components/Modal/MyWalletModal";
import { UserProvider } from "../context/UserProvider";
import StakeModal from "../components/Modal/StakeModal";
import "react-loading-skeleton/dist/skeleton.css";
import {
  HoverContextProvider,
  TabContextProvider,
} from "../context/ButtonProvider";

const GTM_ID = "G-59578BZHR4";

interface Window {
  dataLayer: any[];
}

const useGoogleTagManager = () => {
  useEffect(() => {
    const handleRouteChange = (url: any) => {
      // Send pageview event to GTM
      (window as any).dataLayer.push({
        event: "pageview",
        pagePath: url,
      });
    };

    if (typeof window !== "undefined") {
      // Load GTM script
      const gtmScript = document.createElement("script");
      gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
      gtmScript.async = true;
      document.head.appendChild(gtmScript);

      // Initialize GTM data layer
      (window as any).dataLayer = (window as any).dataLayer || [];

      // Add route change listener
      window.addEventListener("routeChangeComplete", handleRouteChange);

      return () => {
        // Remove route change listener
        window.removeEventListener("routeChangeComplete", handleRouteChange);
      };
    }
  }, []);
};

export default function App({ Component, pageProps }: AppProps) {
  useGoogleTagManager();

  return (
    <WalletConnect>
      <WalletModalProvider>
        <UserProvider>
          <ModalProvider>
            <HoverContextProvider>
              <TabContextProvider>
                <MainLayout>
                  <Component {...pageProps} />
                  <ProfileModal />
                  <DisconnectWalletModal />
                  <ShareModal />
                  <AboutModal />
                  <MyWalletModal />
                  <StakeModal />
                </MainLayout>
              </TabContextProvider>
            </HoverContextProvider>
          </ModalProvider>
        </UserProvider>
        <ToastContainer
          style={{ fontSize: 15 }}
          pauseOnFocusLoss={false}
          enableMultiContainer={false}
        />
      </WalletModalProvider>
    </WalletConnect>
  );
}
