import React, { useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { errorAlert } from "./ToastGroup";
import Button from "./Button";
import { BackpackIcon, LedgerIcon, PhantomIcon } from "./SvgIcons";
import { useUserData } from "../context/UserProvider";
import Skeleton from "react-loading-skeleton";
import { LAMPORTS_PER_SOL, SystemProgram, Transaction } from "@solana/web3.js";

const ConnectWallet = () => {
  const { wallets, select, publicKey, connected, signTransaction } = useWallet();
  const { isSignning, sign } = useUserData();
  const { connection } = useConnection();

  const handleConnect = async (walletName: string) => {
    try {
      const wallet = wallets.find(
        (wallet) => wallet.adapter.name === walletName
      );
      if (wallet) {
        if (wallet.readyState === "Installed") {
          select(wallet.adapter.name);
          // await sign();
        } else {
          errorAlert("Cannot connect the wallet!");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSign = async () => {
    await sign();
  };

  const handleClickAddLedgerWallet = async () => {
    if (!publicKey || !signTransaction) {
      return console.log("Wallet not connected");
    }

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: publicKey,
        lamports: 0.001 * LAMPORTS_PER_SOL,
      })
    );

    transaction.feePayer = publicKey;
    const blockhash = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash.blockhash;

    const signed = await signTransaction(transaction);
    const signature = await connection.sendRawTransaction(signed.serialize());
    const txRes = await connection.confirmTransaction({
      blockhash: blockhash.blockhash,
      lastValidBlockHeight: blockhash.lastValidBlockHeight,
      signature: signature,
    });

    if (txRes.value.err) {
      return alert(
        "Transaction failed, please make sure you have enough SOL in your wallet"
      );
    }

    const address = publicKey?.toBase58();

    if (!address) {
      return console.log("Wallet not connected");
    }


  };

  useEffect(() => {
    handleConnect("Phantom");
  }, []);
  return (
    <div className="relative connect">
      <div className="">
        {isSignning ? (
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
          <>
            {publicKey ? (
              <Button variant="primary" onClick={handleSign}>
                Connect wallet
              </Button>
            ) : (
              <Button variant="primary" onClick={handleSign}>
                Connect wallet
              </Button>
            )}
          </>
        )}
      </div>
      <div className="min-w-[238px] py-3 px-4 absolute right-auto left-0 lg:left-auto lg:right-0 top-[40px] connect-drop">
        <div
          className="absolute left-0 top-5 w-full h-[calc(100%-20px)] opacity-70 backdrop-blur-[10px]"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #0F0902 0%, #26211E 100%)",
          }}
        ></div>
        {/* <div className="relative z-10 mt-5">
          <button
            className="p-3 text-[16px] font-medium text-white w-full text-left hover:bg-[#e1e4cd1a] active:bg-[#1e191566]"
            onClick={() => handleSign()}
          >
            <div className="flex items-center gap-2">
              <PhantomIcon /> Phantom
            </div>
          </button>
          <button
            className="p-3 text-[16px] font-medium text-white w-full text-left hover:bg-[#e1e4cd1a] active:bg-[#1e191566]"
            onClick={() => handleConnect("Backpack")}
          >
            <div className="flex items-center gap-2">
              <BackpackIcon /> Backpack
            </div>
          </button>
          <button
            className="p-3 text-[16px] font-medium text-white w-full text-left hover:bg-[#e1e4cd1a] active:bg-[#1e191566]"
            onClick={() => handleConnect("Ledger")}
          >
            <div className="flex items-center gap-2"
              onClick={() => handleClickAddLedgerWallet()}
            >
              <LedgerIcon />
              Phantom/Ledger
            </div>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ConnectWallet;
