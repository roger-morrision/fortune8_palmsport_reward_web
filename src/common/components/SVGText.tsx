import { FontFamily } from "@/src/constants/Fonts";
import React, { useId } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Text,
  Filter,
  FeDropShadow,
  TSpan,
} from "react-native-svg";

type Props = {
  text: string;
  fontSize: number;
  strokeWidth?: number;
  fontFamily?: FontFamily;
  fillColors?: string[]; // for gradient fill
  strokeColors?: string[]; // for gradient stroke
  offsetFillColors?: number[];
  style?: StyleProp<ViewStyle>;
  dataSet: any;
};

const SVGText = ({
  text,
  style,
  fontSize,
  dataSet,
  strokeWidth = 3,
  fontFamily = "PoppinsExtraBold",
  fillColors = ["#D7F1FF", "#D7F1FF"],
  offsetFillColors = [0, 1], // default orange → yellow
  strokeColors = ["#000000", "#000000"], // default deep blue → violet
}: Props) => {
  const uniqueId = useId(); // ensures uniqueness per instance

  // IDs for gradients and shadow
  const strokeId = `strokeGradient-${uniqueId}`;
  const fillId = `fillGradient-${uniqueId}`;
  const shadowId = `textShadow-${uniqueId}`;

  // Split text by line breaks
  const lines = text.split("\n");

  // Compute SVG size
  const lineHeight = fontSize;
  const totalHeight = lineHeight * lines.length;
  const maxWidth = fontSize * Math.max(...lines.map((l) => l.length));

  // Helper to create gradient stops dynamically
  const renderStops = (colors: string[]) => {
    return colors.map((color, index) => {
      return (
        <Stop
          key={index}
          offset={`${(index / (colors.length - 1)) * 100}%`}
          stopColor={color}
          stopOpacity="1"
        />
      );
    });
  };

  const renderFillStops = (colors: string[]) => {
    return colors.map((color, index) => {
      return (
        <Stop key={index} offset={offsetFillColors[index]} stopColor={color} stopOpacity="1" />
      );
    });
  };

  return (
    <View style={[{}, style]} dataSet={dataSet}>
      <Svg height={totalHeight + fontSize} width={maxWidth + fontSize}>
        <Defs>
          {/* Stroke Gradient */}
          <LinearGradient id={strokeId} x1="0" y1="0" x2="1" y2="0">
            {renderStops(strokeColors)}
          </LinearGradient>

          {/* Fill Gradient */}
          <LinearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
            {renderFillStops(fillColors)}
          </LinearGradient>

          {/* Drop Shadow */}
          <Filter id={shadowId} x="-50%" y="-50%" width="200%" height="200%">
            <FeDropShadow dx="2" dy="2" stdDeviation="2" floodColor="black" floodOpacity="0.6" />
          </Filter>
        </Defs>

        {/* Outline Stroke */}
        <Text
          x="50%"
          y="50%" // start from top padding
          fontSize={fontSize}
          fontWeight="bold"
          fill="none"
          stroke={`url(#${strokeId})`}
          strokeWidth={strokeWidth}
          fontFamily={fontFamily}
          textAnchor="middle"
          alignmentBaseline="hanging"
          filter={`url(#${shadowId})`}
        >
          {/* {text} */}
          {lines.map((line, i) => (
            <TSpan
              key={i}
              x="50%"
              dy={i === 0 ? 0 : fontSize * 1.2} // line spacing
            >
              {line}
            </TSpan>
          ))}
        </Text>

        {/* Gradient Fill */}
        <Text
          x="50%"
          y={"50%"}
          fontSize={fontSize}
          fontWeight="bold"
          fill={`url(#${fillId})`}
          fontFamily={fontFamily}
          textAnchor="middle"
          alignmentBaseline="hanging"
          filter={`url(#${shadowId})`}
        >
          {/* {text} */}
          {lines.map((line, i) => (
            <TSpan
              key={i}
              x="50%"
              dy={i === 0 ? 0 : fontSize * 1.2} // same line spacing
            >
              {line}
            </TSpan>
          ))}
        </Text>
      </Svg>
    </View>
  );
};

export default SVGText;
