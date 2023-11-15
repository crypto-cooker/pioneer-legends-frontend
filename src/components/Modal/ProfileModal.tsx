import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../context/ModalProvider";
import {
  UserContext,
  UserContextProps,
  useUserData,
} from "../../context/UserProvider";
import { getNonce, requestSignature, updateProfile } from "../../utils/api";
import useWindowSize from "../../utils/useWindowSize";
import Button from "../Button";
import ImageCard from "../ImageCard";
import { CrossIcon } from "../SvgIcons";
import { errorAlert } from "../ToastGroup";
import CloseButton from "./CloseButton";
import DisplayNamebox from "./DisplayNamebox";

/* eslint-disable @next/next/no-img-element */
const ProfileModal = () => {
  const { userData, getUserData } = useUserData();
  const [username, setUsername] = useState(userData.username);
  const [isClose, setIsClose] = useState(false);
  const { isProfileModal, setIsProfileModal } = useContext<any>(ModalContext);
  const wallet = useWallet();
  const [inputActive, setInputActive] = useState(false);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [checkedImge, setCheckedImage] = useState(userData.image);
  const [checkedMin, setCheckedMint] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const useData = useContext<UserContextProps>(UserContext);
  const { width } = useWindowSize();
  const isMobile = width > 768;

  const allNftList = useData ? useData.allNftList : [];

  if (!wallet.publicKey || !isProfileModal) return <></>;

  const closeModal = () => {
    if (username !== userData.username) {
      setIsClose(true);
    } else {
      setIsClose(false);
    }
    setIsProfileModal(false);
  };

  const update = async () => {
    if (username === "" || userData.username === "username") {
      // errorAlert("Please enter a valid username.");
      return;
    }
    setIsSaving(true);
    try {
      // const sig = await requestSignature(
      //   wallet,
      //   `Authorize your wallet.\nname: ${username}\nwallet: ${
      //     wallet.publicKey?.toBase58() as string
      //   }\nnonce: ${getNonce(wallet.publicKey?.toBase58() as string)}`
      // );
      const nonce = localStorage.getItem("nonce");
      if (!nonce) return;
      await updateProfile({
        name: username,
        wallet: wallet.publicKey?.toBase58() as string,
        image: checkedImge,
        signature: nonce,
      });
    } catch (error) {
      console.log(error);
    } finally {
      localStorage.setItem("pfp", checkedImge);
      localStorage.setItem("username", username);
      getUserData();
      setIsSaving(false);
      setIsProfileModal(false);
    }
  };

  const BlankCards = () => {
    return (
      <div className="absolute top-1/2 -translate-y-[65%] left-1/2 -translate-x-1/2 flex items-center flex-col gap-2">
        <div className="h-[100px] w-[100px] rounded-[50%] bg-[radial-gradient(115.57%_115.57%_at_-3.5%_-16%,#3F434B_0%,#2D2721_100%);] flex items-center justify-center">
          <img
            src="/img/default-avatar.jpg"
            alt=""
            className="rounded-[50%] w-[84px] h-[84px] object-none"
          />
        </div>
        <h1 className="font-medium text-center text-[#E4DECD] whitespace-nowrap">
          You have no NFT,
          <br />
          buy one now on{" "}
          <span className="underline ">
            <a
              href="https://magiceden.io/marketplace/pioneer_legends"
              target="_blank"
              rel="noopener noreferrer"
            >
              Magic Eden
            </a>
          </span>{" "}
          Or{" "}
          <span className="underline">
            <a
              href="https://www.tensor.trade/trade/pioneer_legends"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tensor!
            </a>
          </span>
        </h1>
      </div>
    );
  };

  return (
    <div className="fixed left-0 top-0 bottom-0 right-0 z-[103] flex items-center justify-center backdrop-blur-[20px] bg-[#000000]/40">
      <div className="w-[576px] h-[590px] max-sm:w-screen max-sm:h-screen bg-[linear-gradient(180deg,#0F0902_0%,#26211E_100%)] relative after:absolute after:top-2 after:left-2 after:bottom-2 after:right-2 max-sm:after:top-0 max-sm:after:left-0 max-sm:after:bottom-0 max-sm:after:right-0 after:bg-[linear-gradient(180deg,#1F1B18_0%,#393028_100%)] after:shadow-[0_0_4px_0_rgba(0,0,0,0.80),1px_1px_2px_0_#37322F_inset]">
        {/**
         * Make corner image
         */}
        <img
          src="/img/Deco_leftbottom.png"
          alt="B_L"
          className="absolute -bottom-1 -left-1 z-[22] max-sm:hidden"
        />
        <img
          src="/img/bottom.png"
          alt="B_R"
          className="absolute -bottom-1 -right-1 z-[22] max-sm:hidden"
        />
        <img
          src="/img/Deco_lefttop.png"
          alt="T_L"
          className="absolute -top-1 -left-1 z-[2] max-sm:hidden"
        />
        <img
          src="/img/top.png"
          alt="T_R"
          className="absolute -top-1 -right-1 z-[2] max-sm:hidden"
        />
        <div className="px-6 py-10 flex justify-between items-center relative z-[2]">
          <p className="text-[24px] font-secondary text-primary-100 leading-[1.33] uppercase">
            edit profile
          </p>
          {/**
           * Close button UI
           */}
          {isMobile ? (
            <CloseButton
              className="absolute right-5 top-[34px] z-50"
              onClose={closeModal}
            />
          ) : (
            <button onClick={closeModal}>
              <CrossIcon color="white" />
            </button>
          )}
        </div>
        <div className="relative z-[20] px-8">
          <DisplayNamebox
            username={username}
            setUsername={setUsername}
            inputActive={inputActive}
            isChanged={isChanged}
            setIsChanged={setIsChanged}
          />
        </div>
        <div className="mt-8 px-8 flex flex-col gap-[10px] relative z-[20]">
          <h1 className="font-medium text-sm text-white">Profile picture</h1>
          {allNftList.length !== 0 ? (
            <div className="w-full min-h-[200px] max-sm:min-h-[calc(100vh-400px)] h-full overflow-x-hidden overflow-y-auto max-h-[200px] max-sm:max-h-[calc(100vh-400px)] relative">
              <div className="grid grid-cols-4 max-sm:grid-cols-3 gap-x-[10px] gap-y-4 relative h-full w-full">
                {allNftList.map((item, index) => (
                  <ImageCard
                    key={index}
                    image={item.image}
                    mint={item.mint}
                    checkMint={checkedMin}
                    setCheckMint={setCheckedMint}
                    setCheckedImage={setCheckedImage}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full min-h-[200px] max-sm:min-h-[calc(100vh-400px)] h-full max-h-[200px] max-sm:max-h-[calc(100vh-400px)] relative">
              <BlankCards />
            </div>
          )}
        </div>
        <div className="sm:py-10 py-0 sm:h-auto h-[88px] sm:px-0 flex items-center sm:justify-center -ml-[1px] justify-between gap-7 sm:relative fixed w-[96%] left-3 px-5 bottom-0 bg-[#342B2590] backdrop-blur-sm z-[20]">
          <div className="w-full h-8 absolute left-0 bottom-[120px] z-10 pointer-events-none blur-[16px] sm:flex hidden bg-[linear-gradient(#1E1915_0%,#362D26_100%)]" />
          <Button
            width={128}
            main={false}
            title="Cancel"
            color="white"
            onClick={closeModal}
          />
          <Button
            width={128}
            title="Save"
            color="white"
            disable={!isSaving && !isChanged && !checkedImge}
            onClick={update}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
