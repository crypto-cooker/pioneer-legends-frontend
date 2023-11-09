import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { styled, keyframes } from "styled-components";
import { HoverContext } from "../../context/HoverProvider";

interface CursorPositionProps {
  x: number;
  y: number;
}

interface CursorProps {
  hover: boolean;
}

const CursorAnim = keyframes`
0%, 100% {background-image: url('/cursor/normal/01.png');}
4% {background-image: url('/cursor/normal/02.png');}
8% {background-image: url('/cursor/normal/03.png');}
12% {background-image: url('/cursor/normal/04.png');}
16% {background-image: url('/cursor/normal/05.png');}
20% {background-image: url('/cursor/normal/06.png');}
24% {background-image: url('/cursor/normal/07.png');}
28% {background-image: url('/cursor/normal/08.png');}
32% {background-image: url('/cursor/normal/09.png');}
36% {background-image: url('/cursor/normal/10.png');}
40% {background-image: url('/cursor/normal/11.png');}
44% {background-image: url('/cursor/normal/12.png');}
48% {background-image: url('/cursor/normal/13.png');}
52% {background-image: url('/cursor/normal/14.png');}
56% {background-image: url('/cursor/normal/15.png');}
60% {background-image: url('/cursor/normal/16.png');}
64% {background-image: url('/cursor/normal/17.png');}
68% {background-image: url('/cursor/normal/18.png');}
72% {background-image: url('/cursor/normal/19.png');}
76% {background-image: url('/cursor/normal/20.png');}
80% {background-image: url('/cursor/normal/21.png');}
84% {background-image: url('/cursor/normal/22.png');}
88% {background-image: url('/cursor/normal/23.png');}
92% {background-image: url('/cursor/normal/24.png');}
96% {background-image: url('/cursor/normal/25.png');}
`;

const CursorHoverAnim = keyframes`
0%, 100% {background-image: url('/cursor/hover/01.png');}
4% {background-image: url('/cursor/hover/02.png');}
8% {background-image: url('/cursor/hover/03.png');}
12% {background-image: url('/cursor/hover/04.png');}
16% {background-image: url('/cursor/hover/05.png');}
20% {background-image: url('/cursor/hover/06.png');}
24% {background-image: url('/cursor/hover/07.png');}
28% {background-image: url('/cursor/hover/08.png');}
32% {background-image: url('/cursor/hover/09.png');}
36% {background-image: url('/cursor/hover/10.png');}
40% {background-image: url('/cursor/hover/11.png');}
44% {background-image: url('/cursor/hover/12.png');}
48% {background-image: url('/cursor/hover/13.png');}
52% {background-image: url('/cursor/hover/14.png');}
56% {background-image: url('/cursor/hover/15.png');}
60% {background-image: url('/cursor/hover/16.png');}
64% {background-image: url('/cursor/hover/17.png');}
68% {background-image: url('/cursor/hover/18.png');}
72% {background-image: url('/cursor/hover/19.png');}
76% {background-image: url('/cursor/hover/20.png');}
80% {background-image: url('/cursor/hover/21.png');}
84% {background-image: url('/cursor/hover/22.png');}
88% {background-image: url('/cursor/hover/23.png');}
92% {background-image: url('/cursor/hover/24.png');}
96% {background-image: url('/cursor/hover/25.png');}
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
  animation-duration: 1.5s;
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
        x: cursorPosition.x + 1,
        y: cursorPosition.y + 1,
      }}
      hover={hover}
    />
  );
};
