import React, { FC, useContext, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";
import { ModalContext } from "../../context/ModalProvider";
import Image from "next/image";
import Button from "../Button";

const DisconnectWalletModal: FC = () => {
  const { isDisconnectWalletModal, setIsDisconnectWalletModal } =
    useContext<any>(ModalContext);

  const { disconnect } = useWallet();
  const router = useRouter();

  const handleDisconnect = async () => {
    await disconnect();
    setIsDisconnectWalletModal(!isDisconnectWalletModal);
    router.push("/");
  };

  return isDisconnectWalletModal ? (
    <div className="fixed left-0 top-0 w-screen h-screen z-[1000] flex items-center justify-center backdrop-blur-[20px]  bg-[#000000]/40 md:px-0 px-[14px]">
      <div className="w-[576px] max-sm:w-[calc(100%-32px)] bg-gradient-to-b from-[#0F0902] to-[#26211E]  rounded-2xl relative p-2">
        <div className="bg-gradient-to-b from-[#1F1B18] to-[#393028]">
          <div className="absolute -right-1 -bottom-3">
            <Image src={"/img/bottom.png"} width={100} height={100} alt="" />
          </div>
          <div className="absolute -left-1 -bottom-3">
            <Image
              src={"/img/Deco_leftbottom.png"}
              width={100}
              height={100}
              alt=""
            />
          </div>
          <div className="absolute -left-1 -top-1">
            <Image
              src={"/img/Deco_lefttop.png"}
              width={80}
              height={60}
              alt=""
            />
          </div>
          <div className="absolute -right-1 -top-1">
            <Image src={"/img/top.png"} width={80} height={60} alt="" />
          </div>
          <div className="grid place-content-center relative z-10">
            <div className="h-[171px] flex justify-center items-center md:px-0 px-10 max-sm:px-0">
              <p className="text-[24px] w-[436px] max-sm:w-[calc(100%-32px)] text-white font-medium text-center">
                Are you sure you want to disconnect your wallet?
              </p>
            </div>
            <div className="flex justify-center space-x-7 mt-6 pb-9">
              <Button
                width={128}
                main={false}
                title="Cancel"
                color="white"
                onClick={() => setIsDisconnectWalletModal(false)}
              />
              <Button
                width={128}
                title="Disconnect"
                color="white"
                onClick={handleDisconnect}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default DisconnectWalletModal;
