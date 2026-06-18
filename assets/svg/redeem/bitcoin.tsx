import * as React from "react";
import Svg, { G, Path, Defs, LinearGradient, Stop, ClipPath, SvgProps } from "react-native-svg";

type Props = SvgProps;

const BTC = (props: Props) => {
  const gradientId = React.useId();
  const clipPathId = React.useId();

  return (
    <Svg viewBox="0 0 36 36" width={36} height={36} {...props}>
      <G clipPath={`url(#${clipPathId})`}>
        <Path
          fill={`url(#${gradientId})`}
          d="M35.462 22.353C33.056 32 23.282 37.866 13.646 35.46 4 33.056-1.866 23.28.54 13.647 2.944 4 12.705-1.866 22.353.54c9.634 2.391 15.514 12.166 13.108 21.814Z"
        />
        <Path
          fill="#fff"
          d="M26.57 15.757c.352-2.39-1.462-3.684-3.965-4.542l.816-3.248-1.97-.493-.787 3.165a52.508 52.508 0 0 0-1.589-.366l.788-3.178-1.969-.492-.801 3.234a87.703 87.703 0 0 1-1.266-.295v-.014l-2.728-.675-.52 2.109s1.462.337 1.434.351c.801.197.942.732.914 1.154l-.928 3.698c.056.014.126.028.21.07-.07-.014-.14-.028-.21-.056l-1.294 5.175c-.098.24-.352.605-.9.464.014.028-1.434-.351-1.434-.351l-.985 2.264 2.574.646c.478.127.942.24 1.406.366l-.816 3.277 1.969.492.816-3.248c.534.14 1.068.28 1.575.407l-.802 3.235 1.969.492.815-3.277c3.375.633 5.907.38 6.961-2.672.858-2.447-.042-3.867-1.814-4.795 1.308-.295 2.278-1.153 2.532-2.897Zm-4.514 6.328c-.604 2.447-4.739 1.125-6.075.788l1.083-4.346c1.336.338 5.64.999 4.992 3.558Zm.62-6.37c-.563 2.236-3.994 1.097-5.105.816l.984-3.938c1.11.281 4.697.802 4.12 3.122Z"
        />
      </G>

      <Defs>
        <LinearGradient
          id={gradientId}
          x1={1799.03}
          x2={1799.03}
          y1={-0.864}
          y2={3599.64}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#F9AA4B" />
          <Stop offset="1" stopColor="#F7931A" />
        </LinearGradient>

        <ClipPath id={clipPathId}>
          <Path d="M0 0h36v36H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default BTC;
