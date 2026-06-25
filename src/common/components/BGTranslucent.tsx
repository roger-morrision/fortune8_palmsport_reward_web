import * as React from "react";
import { StyleSheet } from "react-native";
import Svg, { Defs, G, LinearGradient, Mask, Rect, Stop } from "react-native-svg";
import View from "./View";

type SvgComponentProps = {
  width?: number;
  height?: number;
  borderWidth?: number;
  borderRadius?: number;
  children?: React.ReactNode;
};

const BGTranslucent: React.FC<SvgComponentProps> = ({
  width = 721,
  height = 471,
  children,
  borderWidth = 4,
  borderRadius = 24,
}) => {
  const outerWidth = width - (borderWidth * 2);
  const outerHeight = height - (borderWidth * 2);
  const half = borderWidth / 2;

    if (!width || !height) return null; // prevent zero-size render

  // 🆔 unique IDs per render to prevent <Defs> collisions
  const ids = React.useMemo(() => {
    const uid = Math.random().toString(36).slice(2, 8);
    return {
      borderGrad: `borderGrad-${uid}`,
      bodyGrad: `bodyGrad-${uid}`,
      mask: `mask-${uid}`,
    };
  }, []);
  
  return (
  <View  style={{ width, height, borderWidth, borderRadius }}>
    <Svg
      width={outerWidth + borderWidth * 2} // 🔧 give breathing room to avoid cutoff
      height={outerHeight + borderWidth * 2}
      style={{ overflow: "visible" }} // ✅ prevent clipping on web
    >
      <Defs>
        {/* Gradient definition */}
        <LinearGradient id={ids.borderGrad} x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#F7D478" />
          <Stop offset="1" stopColor="#F7AE4F" />
        </LinearGradient>

        {/* Body (inner) gradient */}
        <LinearGradient id={ids.bodyGrad} x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="rgba(26, 70, 179, 0.8)" />
          <Stop offset="1" stopColor="rgba(11, 30, 77, 0.8)" />
        </LinearGradient>

        {/* Mask with precise inner cut */}
        <Mask id={ids.mask}>
          {/* Outer white shape */}
          <Rect
            x={0}
            y={0}
            width={outerWidth + borderWidth * 2}
            height={outerHeight + borderWidth * 2}
            fill="white"
            rx={borderRadius + borderWidth}
          />
          {/* Inner black shape (cutout) */}
          <Rect
            x={borderWidth + half}
            y={borderWidth + half}
            width={outerWidth - borderWidth }
            height={outerHeight - borderWidth}
            rx={borderRadius}
            fill="black"
          />
        </Mask>
      </Defs>

      <G>
        {/* Main gradient rectangle */}
        <Rect
          x={0}
          y={0}
          width={outerWidth + borderWidth * 2}
          height={outerHeight + borderWidth * 2}
          rx={borderRadius + borderWidth}
          fill={`url(#${ids.borderGrad})`}
          mask={`url(#${ids.mask})`}
        />

        {/* Inner gradient background */}
        <Rect
          x={borderWidth + half}
          y={borderWidth + half}
          width={outerWidth - borderWidth}
          height={outerHeight - borderWidth}
          rx={borderRadius}
          fill={`url(#${ids.bodyGrad})`}
        />
      </G>
    </Svg>
    <View style={StyleSheet.absoluteFill}>
      {children}
    </View>
  </View>
);
}

export default BGTranslucent;
