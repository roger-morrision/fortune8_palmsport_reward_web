import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop, SvgProps } from "react-native-svg";

type Props = SvgProps;

const ACH = (props: Props) => {
  const gradientId = React.useId(); // ✅ unique per render

  return (
    <Svg viewBox="0 0 35 34" width={35} height={34} {...props}>
      <Path
        fill={`url(#${gradientId})`}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.672.277 33.547 8.59A2.625 2.625 0 0 1 35 10.94v2.52c0 1.207-.98 2.188-2.188 2.188H31.5v14h1.75a1.75 1.75 0 0 1 0 3.5H1.75a1.75 1.75 0 1 1 0-3.5H3.5v-14H2.187A2.188 2.188 0 0 1 0 13.46v-2.52c0-.913.472-1.753 1.236-2.23L16.325.278a2.625 2.625 0 0 1 2.346 0Zm7.578 15.37H8.75v14h3.5v-10.5h3.5v10.5h3.5v-10.5h3.5v10.5h3.5v-14Zm-8.75-8.75a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5Z"
      />

      <Defs>
        <LinearGradient
          id={gradientId}
          x1={35}
          x2={35}
          y1={0}
          y2={33.148}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#EBCD75" />
          <Stop offset="0.205" stopColor="#FFDF83" />
          <Stop offset="0.365" stopColor="#FFE183" />
          <Stop offset="0.521" stopColor="#FFE484" />
          <Stop offset="0.771" stopColor="#DDBD61" />
          <Stop offset="0.99" stopColor="#AD954E" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default ACH;
