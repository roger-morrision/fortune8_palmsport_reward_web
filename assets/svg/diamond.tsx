import React, { useId } from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
import { SvgProps } from "react-native-svg";

const Diamond = ({ width = 16, height = 13, ...props }: SvgProps) => {
  const id = useId();
  const gradId = `diamond-grad-${id}`;
  return (
    <Svg width={width} height={height} viewBox="0 0 16 13" fill="none" {...props}>
      <Path
        d="M0 4H4L7 12.6L0 4ZM16 4H12L9 12.6L16 4ZM8 13L5 4H11L8 13ZM4 3H0L2 0L4 3ZM16 3H12L14 0L16 3ZM10 3H6L8 0L10 3ZM3.34 0H7L5 3L3.34 0ZM9 0H13L11 3L9 0Z"
        fill={`url(#${gradId})`}
      />
      <Defs>
        <LinearGradient id={gradId} x1="8" y1="0" x2="8" y2="13" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FFE598" />
          <Stop offset="1" stopColor="#F1B80E" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default Diamond;
