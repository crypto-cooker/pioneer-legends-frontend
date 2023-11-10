import React, { useEffect, useRef, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { errorAlert } from "./ToastGroup";
import Button from "./Button";
import { BackpackIcon, LedgerIcon, PhantomIcon } from "./SvgIcons";
import { useUserData } from "../context/UserProvider";
import Skeleton from "react-loading-skeleton";
import { LAMPORTS_PER_SOL, SystemProgram, Transaction } from "@solana/web3.js";
import { connect } from "http2";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

const ConnectWallet = () => {
  const {
    wallets,
    select,
    connect,
    wallet,
    publicKey,
    signTransaction,
    signMessage,
  } = useWallet();
  const walletModal = useWalletModal();
  const { isSigning, sign } = useUserData();

  const [signIn, setSignIn] = useState(false);
  const [signInLedger, setSignInLedger] = useState(false);

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLDivElement>(null);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);

  const showDropdown = () => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
      hideTimeout.current = null;
    }
    setDropdownVisible(true);
  };

  const hideDropdown = () => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
    }
    // Set a delay before hiding the dropdown to allow for cursor movement over the gap
    hideTimeout.current = setTimeout(() => {
      setDropdownVisible(false);
    }, 250); // 250ms should be enough for a small gap; adjust as needed
  };

  useEffect(() => {
    // Add event listeners for mouse over and mouse out
    const buttonEl = dropdownButtonRef.current;
    const dropdownEl = dropdownRef.current;

    buttonEl?.addEventListener("mouseover", showDropdown);
    buttonEl?.addEventListener("mouseout", hideDropdown);
    dropdownEl?.addEventListener("mouseover", showDropdown);
    dropdownEl?.addEventListener("mouseout", hideDropdown);

    // Clean up
    return () => {
      buttonEl?.removeEventListener("mouseover", showDropdown);
      buttonEl?.removeEventListener("mouseout", hideDropdown);
      dropdownEl?.removeEventListener("mouseover", showDropdown);
      dropdownEl?.removeEventListener("mouseout", hideDropdown);
    };
  }, []);

  useEffect(() => {
    if (wallet && publicKey) {
      if (signIn && signMessage) {
        setSignIn((prev) => {
          sign();
          return false;
        });
      } else if (signInLedger && signTransaction) {
        setSignInLedger((prev) => {
          sign(true);
          return false;
        });
      }
    }
  }, [wallet, publicKey, signTransaction]);

  const handleConnect = async (walletName: string, ledger: boolean = false) => {
    try {
      const walletAdapter = wallets.find(
        (wallet) => wallet.adapter.name === walletName
      );

      if (!walletAdapter) {
        errorAlert("Cannot find the wallet provider!");
      } else {
        if (wallet && wallet.adapter.name == walletName) {
          sign(ledger);
        } else if (walletAdapter) {
          if (walletAdapter.readyState === "Installed") {
            select(walletAdapter.adapter.name);
            if (ledger) setSignInLedger(true);
            else setSignIn(true);
          } else {
            errorAlert("Cannot connect the wallet!");
          }
        }
      }
    } catch (error: any) {
      errorAlert(error.toString());
      console.log(error);
    }
  };

  return (
    <div className="relative connect">
      <div
        className="flex flex-row gap-8"
        ref={dropdownButtonRef}
        onClick={() => {
          walletModal.setVisible(true);
        }}
      >
        {isSigning ? (
          <Skeleton
            baseColor="#828282"
            highlightColor="#999999"
            style={{
              width: 136,
              height: 40,
              borderRadius: 6,
            }}
          />
        ) : (
          <Button width={142} title="Connect wallet" color="white" />
        )}
      </div>
      <div
        className="min-w-[238px] py-3 px-4 absolute right-auto left-0 lg:left-auto lg:right-0 top-[40px]"
        style={{ display: isDropdownVisible ? "block" : "none" }}
        ref={dropdownRef}
      >
        <div
          className="absolute left-0 top-5 w-full h-[calc(100%-20px)] opacity-70 backdrop-blur-[10px]"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #0F0902 0%, #26211E 100%)",
          }}
        ></div>
        <div className="relative z-10 mt-5">
          <button
            className="p-3 text-[16px] font-medium text-white w-full text-left hover:bg-[#e1e4cd1a] active:bg-[#1e191566] cursor-none"
            onClick={() => handleConnect("Phantom")}
          >
            <div className="flex items-center gap-2">
              <PhantomIcon /> Phantom
            </div>
          </button>
          <button
            className="p-3 text-[16px] font-medium text-white w-full text-left hover:bg-[#e1e4cd1a] active:bg-[#1e191566] cursor-none"
            onClick={() => handleConnect("Backpack")}
          >
            <div className="flex items-center gap-2">
              <BackpackIcon /> Backpack
            </div>
          </button>
          <button
            className="p-3 text-[16px] font-medium text-white w-full text-left hover:bg-[#e1e4cd1a] active:bg-[#1e191566] cursor-none"
            onClick={() => handleConnect("Phantom", true)}
          >
            <div className="flex items-center gap-2">
              <LedgerIcon />
              Phantom/Ledger
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
