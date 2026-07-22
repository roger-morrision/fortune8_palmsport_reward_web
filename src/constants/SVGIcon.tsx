import React from "react";
import { SvgUri, SvgProps } from "react-native-svg";
import { Platform } from "react-native";
import Colors from "./Colors";
import { CDN_URL } from "./Config";

const SVG_CDN = CDN_URL + "/svg-assets/palmsplay";

// CDN SVG paths — mirrors the CDNImages pattern in Images.ts
const CDNSVGs = {
  // TABS
  "home":        SVG_CDN + "/tabs/home.svg",
  "menu":        SVG_CDN + "/tabs/menu.svg",
  "raffle-draw": SVG_CDN + "/tabs/redeem.svg",
  "draw-result": SVG_CDN + "/tabs/redeem.svg",
  "account":     SVG_CDN + "/tabs/account.svg",
  "redeem":      SVG_CDN + "/tabs/redeem.svg",
  "tier-level":  SVG_CDN + "/tabs/tier-level.svg",

  // COINS
  "sc-coin": SVG_CDN + "/sc-coin.svg",

  // ICONS
  "email":           SVG_CDN + "/email.svg",
  "email-sent":      SVG_CDN + "/email-sent.svg",
  "game-controller": SVG_CDN + "/game-controller.svg",
  "diamond":         SVG_CDN + "/diamond.svg",
  "gift":            SVG_CDN + "/gift.svg",
  "warning":         SVG_CDN + "/warning.svg",
  "earn":            SVG_CDN + "/earn.svg",
  "unlock":          SVG_CDN + "/unlock.svg",
  "exclusive":       SVG_CDN + "/exclusive.svg",
  "elite":           SVG_CDN + "/elite.svg",
  "upload":          SVG_CDN + "/upload.svg",

  // MENU
  "menu-arcade": SVG_CDN + "/menu/arcade.svg",

  // ACCOUNT
  "account-badge":        SVG_CDN + "/account/badge.svg",
  "account-me":           SVG_CDN + "/account/account.svg",
  "account-transactions": SVG_CDN + "/account/transaction.svg",
  "account-redeem":       SVG_CDN + "/account/redeem.svg",
  "account-logout":       SVG_CDN + "/account/logout.svg",
  "account-terms":        SVG_CDN + "/account/terms.svg",
  "account-faq":          SVG_CDN + "/account/faq.svg",
  "account-support":      SVG_CDN + "/account/support.svg",
  "account-how-to-play":  SVG_CDN + "/account/how-to-play.svg",
  "account-privacy":      SVG_CDN + "/account/privacy.svg",

  // TIER LEVEL
  "tierlevel-double-arrow": SVG_CDN + "/tier-level/double-arrow.svg",

  // KYC
  "kyc-document": SVG_CDN + "/kyc/document.svg",
  "kyc-id":       SVG_CDN + "/kyc/id.svg",
  "kyc-camera":   SVG_CDN + "/kyc/camera.svg",
  "kyc-upload":   SVG_CDN + "/kyc/upload.svg",
  "kyc-verified": SVG_CDN + "/kyc/verified.svg",

  // REDEEM
  "time":              SVG_CDN + "/redeem/time.svg",
  "failed":            SVG_CDN + "/redeem/failed.svg",
  "redeem-bank":       SVG_CDN + "/redeem/bank.svg",
  "redeem-paypal":     SVG_CDN + "/redeem/paypal.svg",
  "redeem-instant-pay":SVG_CDN + "/redeem/instant-pay.svg",
} as const;

export type SVGName = keyof typeof CDNSVGs;

export interface IconProps extends SvgProps {
  name: SVGName;
  id?: any;
  size?: number;
  stroke?: string;
  fill?: string;
  fill1?: string;
  isActive?: boolean;
}

const DEFAULT_SIZES: Record<SVGName, { w: number; h: number }> = {
  "home":                   { w: 19,  h: 20  },
  "menu":                   { w: 26,  h: 26  },
  "raffle-draw":            { w: 24,  h: 24  },
  "draw-result":            { w: 24,  h: 24  },
  "account":                { w: 21,  h: 26  },
  "redeem":                 { w: 23,  h: 23  },
  "tier-level":             { w: 25,  h: 25  },
  "sc-coin":                { w: 19,  h: 19  },
  "email":                  { w: 40,  h: 32  },
  "email-sent":             { w: 108, h: 60  },
  "game-controller":        { w: 15,  h: 11  },
  "diamond":                { w: 16,  h: 13  },
  "gift":                   { w: 15,  h: 14  },
  "warning":                { w: 95,  h: 87  },
  "earn":                   { w: 56,  h: 56  },
  "unlock":                 { w: 56,  h: 56  },
  "exclusive":              { w: 56,  h: 56  },
  "elite":                  { w: 56,  h: 56  },
  "upload":                 { w: 26,  h: 25  },
  "menu-arcade":            { w: 23,  h: 23  },
  "account-badge":          { w: 54,  h: 56  },
  "account-me":             { w: 23,  h: 23  },
  "account-transactions":   { w: 23,  h: 23  },
  "account-redeem":         { w: 23,  h: 23  },
  "account-logout":         { w: 23,  h: 23  },
  "account-terms":          { w: 23,  h: 23  },
  "account-faq":            { w: 23,  h: 23  },
  "account-support":        { w: 23,  h: 23  },
  "account-how-to-play":    { w: 23,  h: 23  },
  "account-privacy":        { w: 23,  h: 23  },
  "tierlevel-double-arrow": { w: 20,  h: 13  },
  "kyc-document":           { w: 21,  h: 21  },
  "kyc-id":                 { w: 22,  h: 16  },
  "kyc-camera":             { w: 22,  h: 18  },
  "kyc-upload":             { w: 100, h: 75  },
  "kyc-verified":           { w: 15,  h: 15  },
  "time":                   { w: 125, h: 125 },
  "failed":                 { w: 132, h: 132 },
  "redeem-bank":            { w: 28,  h: 28  },
  "redeem-paypal":          { w: 25,  h: 30  },
  "redeem-instant-pay":     { w: 28,  h: 28  },
};

const DEFAULT_FILLS: Partial<Record<SVGName, string>> = {
  "warning":       "#EBCD75",
  "account-badge": Colors.dark.copper,
  "menu-arcade":   Colors.dark.textLabel,
};

const SVGIcon = ({ name, width, height, fill, style, ...props }: IconProps) => {
  const uri = CDNSVGs[name];
  if (!uri) return null;

  const def = DEFAULT_SIZES[name];
  const w = width ?? def?.w ?? 24;
  const h = height ?? def?.h ?? 24;

  if (Platform.OS === "web") {
    return (
      <img
        src={uri}
        width={Number(w)}
        height={Number(h)}
        style={{ display: "block", ...(style as React.CSSProperties) }}
      />
    );
  }

  const resolvedFill = fill ?? DEFAULT_FILLS[name];
  return (
    <SvgUri
      uri={uri}
      width={w}
      height={h}
      fill={resolvedFill}
      {...props}
    />
  );
};

export { CDNSVGs };
export default SVGIcon;
