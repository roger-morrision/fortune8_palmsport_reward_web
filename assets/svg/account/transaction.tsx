import * as React from "react";
import Svg, { G, Mask, Path, SvgProps } from "react-native-svg";

type Props = SvgProps;

const Transaction = (props: Props) => {
  const maskId = React.useId(); // 🔥 unique per render

  return (
    <Svg fill="none" viewBox="0 0 23 23" {...props}>
      <Mask
        id={maskId}
        width={17}
        height={17}
        x={3}
        y={3}
        maskUnits="userSpaceOnUse"
        style={{ maskType: "luminance" }}
      >
        <Path
          fill="#fff"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.667}
          d="M17.75 4H5.25A1.25 1.25 0 0 0 4 5.25v12.5A1.25 1.25 0 0 0 5.25 19h12.5A1.25 1.25 0 0 0 19 17.75V5.25A1.25 1.25 0 0 0 17.75 4Z"
        />
        <Path
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.667}
          d="m10.25 14.417 2.083 1.666 3.333-4.166M7.333 7.75h8.333m-8.333 3.333h3.333"
        />
      </Mask>

      <G mask={`url(#${maskId})`}>
        <Path fill="#7F8CA1" d="M1.5 1.5h20v20h-20v-20Z" />
      </G>
    </Svg>
  );
};

export default Transaction;
