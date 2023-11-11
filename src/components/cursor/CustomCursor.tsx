import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { styled, keyframes } from "styled-components";
import { HoverContext } from "../../context/ButtonProvider";

interface CursorPositionProps {
  x: number;
  y: number;
}

interface CursorProps {
  hover: boolean;
}

const CursorAnim = keyframes`
0% {background-image: url('/cursor/normal/01.png');}
14% {background-image: url('/cursor/normal/02.png');}
28% {background-image: url('/cursor/normal/03.png');}
42% {background-image: url('/cursor/normal/04.png');}
56% {background-image: url('/cursor/normal/05.png');}
70% {background-image: url('/cursor/normal/06.png');}
84% {background-image: url('/cursor/normal/07.png');}
100% {background-image: url('/cursor/normal/08.png');}
`;

const CursorHoverAnim = keyframes`
0% {background-image: url('/cursor/hover/01.png');}
14% {background-image: url('/cursor/hover/02.png');}
28% {background-image: url('/cursor/hover/03.png');}
42% {background-image: url('/cursor/hover/04.png');}
56% {background-image: url('/cursor/hover/05.png');}
70% {background-image: url('/cursor/hover/06.png');}
84% {background-image: url('/cursor/hover/07.png');}
100% {background-image: url('/cursor/hover/08.png');}
`;

const Cursor = styled(motion.div)<CursorProps>`
  height: 50px;
  width: 50px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999999;
  animation-name: ${(props) => (props.hover ? CursorHoverAnim : CursorAnim)};
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
`;

export const CustomCursor = () => {
  const [cursorPosition, setCursorPosition] = useState<CursorPositionProps>({
    x: 0,
    y: 0,
  });
  const { hover } = useContext(HoverContext);

  useEffect(() => {
    const handleCursorMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleCursorMove);

    return () => {
      window.removeEventListener("mousemove", handleCursorMove);
    };
  }, []);

  return (
    <Cursor
      animate={{
        x: cursorPosition.x + 3,
        y: cursorPosition.y + 1,
      }}
      transition={{
        ease: "linear",
        duration: 0,
      }}
      hover={hover}
    />
  );
};
