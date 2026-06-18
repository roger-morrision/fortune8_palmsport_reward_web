// hooks/useBreakpoint.ts
import { useMemo } from "react";
import { useWindowDimensions } from "react-native";

export type Breakpoint = "mobile" | "tablet" | "laptop" | "desktop";

type Props = {
  mobile?: any;
  tablet?: any;
  large?: any;
  xlarge?: any;
  default?: any;
  custom?: any;
};

export function useBreakpoint(config: Props) {
  const { width } = useWindowDimensions();

  return useMemo(() => {
    const defaultvalue = config["default"];
    if (config["custom"]) return config["custom"];
    if (width < 600) return config["mobile"] ?? defaultvalue;
    if (width >= 600 && width <= 1024) return config["tablet"] ?? defaultvalue;
    if (width >= 1024 && width <= 1440) return config["large"] ?? defaultvalue;
    if (width > 1440) return config["xlarge"] ?? defaultvalue;
    return defaultvalue;
  }, [config, width]);
}
