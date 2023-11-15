import Image from "next/image";
import { FC } from "react";

interface ButtonProps {
  onClose: any;
  className?: string;
}

const CloseButton: FC<ButtonProps> = ({ className = "", onClose }) => {
  return (
    <button
      className={`${className} drop-shadow-[4px_4px_0_#1E1915] active:drop-shadow-none duration-300`}
      onClick={onClose}
    >
      <div className="h-10 w-10 [clip-path:polygon(5px_0,calc(100%-5px)_0,100%_5px,100%_calc(100%-5px),calc(100%-5px)_100%,5px_100%,0_calc(100%-5px),0_5px)] bg-[linear-gradient(180deg,#647475_0%,#30353D_100%)] hover:bg-[linear-gradient(180deg,#7F99A1_0%,#30353D_100%)] duration-300 active:translate-x-1 active:translate-y-1">
        <div className="button_shadow flex items-center justify-center">
          <Image
            src="/img/white-close.svg"
            width={24}
            height={24}
            alt="Close button"
            className=""
          />
        </div>
      </div>
    </button>
  );
};

export default CloseButton;
