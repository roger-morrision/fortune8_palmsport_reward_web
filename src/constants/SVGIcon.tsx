import React from "react";
import { SvgProps } from "react-native-svg";
import Colors from "./Colors";

//SVGs
import BCoin from "@/assets/svg/b-coin.svg";
import Coin from "@/assets/svg/coin.svg";
import Logo from "@/assets/svg/logo/logo";
import LogoName from "@/assets/svg/logo/logo-name";
import SCCoin from "@/assets/svg/sc-coin.svg";
import Warning from "@/assets/svg/warning.svg";

import EmailSent from "@/assets/svg/email-sent.svg";
import Email from "@/assets/svg/email.svg";
import Gift from "@/assets/svg/gift.svg";
import GameController from "@/assets/svg/game-controller.svg";
import Diamond from "@/assets/svg/diamond.svg";
import Heart from "@/assets/svg/heart.svg";
import GHome from "@/assets/svg/home.svg";
import GSettings from "@/assets/svg/settings.svg";
import Account from "@/assets/svg/tabs/account.svg";
import Home from "@/assets/svg/tabs/home.svg";
import Menu from "@/assets/svg/tabs/menu.svg";
import Redeem from "@/assets/svg/tabs/redeem.svg";
import TierLevel from "@/assets/svg/tabs/tier-level.svg";
import Trophy from "@/assets/svg/trophy";
import Up from "@/assets/svg/up.svg";
import Upload from "@/assets/svg/upload.svg";
import Earn from "@/assets/svg/earn.svg";
import Unlock from "@/assets/svg/unlock.svg";
import Exclusive from "@/assets/svg/exclusive.svg";
import Elite from "@/assets/svg/elite.svg";

// REDEEM
import Bitcoin from "@/assets/svg/redeem/bitcoin";
import ACH from "@/assets/svg/redeem/ach";
import Time from "@/assets/svg/redeem/time.svg";
import Failed from "@/assets/svg/redeem/failed.svg";
import Bank from "@/assets/svg/redeem/bank.svg";
import Paypal from "@/assets/svg/redeem/paypal.svg";
import InstantPay from "@/assets/svg/redeem/instant-pay.svg";

// CATEGORIES
import Instant from "@/assets/svg/categories/instant.svg";
import New from "@/assets/svg/categories/new.svg";
import Puzzle from "@/assets/svg/categories/puzzle.svg";
import Slots from "@/assets/svg/categories/slots.svg";
import Table from "@/assets/svg/categories/table.svg";

// MENU CATEGORIES
import MENUArcade from "@/assets/svg/menu/arcade.svg";
import MENUFeature from "@/assets/svg/menu/feature.svg";
import MENUHourglass from "@/assets/svg/menu/hourglass.svg";
import MENUInstant from "@/assets/svg/menu/instant.svg";
import MENULobby from "@/assets/svg/menu/lobby.svg";
import MENUNew from "@/assets/svg/menu/new.svg";
import MENUPuzzle from "@/assets/svg/menu/puzzle.svg";
import MENURoulette from "@/assets/svg/menu/roulette.svg";
import MENUSlots from "@/assets/svg/menu/slots.svg";
import MENUSound from "@/assets/svg/menu/sound.svg";
import MENUTable from "@/assets/svg/menu/table.svg";
import MENUTop from "@/assets/svg/menu/top.svg";

// ACCOUNT
import ACCOUNTBadge from "@/assets/svg/account/badge.svg";
import ACCOUNTMe from "@/assets/svg/account/account.svg";
import ACCOUNTTransactions from "@/assets/svg/account/transaction";
import ACCOUNTRedeem from "@/assets/svg/account/redeem.svg";
import ACCOUNTLogout from "@/assets/svg/account/logout.svg";
import ACCOUNTTerms from "@/assets/svg/account/terms.svg";
import ACCOUNTFAQs from "@/assets/svg/account/faq.svg";
import ACCOUNTSupport from "@/assets/svg/account/support.svg";
import ACCOUNTHowToPlay from "@/assets/svg/account/how-to-play.svg";
import ACCOUNTPrivacy from "@/assets/svg/account/privacy.svg";

// TIERLEVEL
import TIERLEVELDoubleArrow from "@/assets/svg/tier-level/double-arrow.svg";
import TIERLEVELRank from "@/assets/svg/tier-level/rank.svg";

// KYC
import KYCDocument from "@/assets/svg/kyc/document.svg";
import KYCID from "@/assets/svg/kyc/id.svg";
import KYCCamera from "@/assets/svg/kyc/camera.svg";
import KYCUpload from "@/assets/svg/kyc/upload.svg";
import KYCVerified from "@/assets/svg/kyc/verified.svg";
import FlipCamera from "@/assets/svg/kyc/flip-camera.svg";

type MENU =
  | "menu-slots"
  | "menu-table"
  | "menu-roulette"
  | "menu-instant"
  | "menu-puzzle"
  | "menu-sound"
  | "menu-arcade"
  | "menu-hourglass"
  | "menu-top"
  | "menu-new"
  | "menu-feature"
  | "menu-lobby";
type INBOX = "warning";
type CATEGORIES = "new" | "slots" | "table" | "instant" | "puzzle";
type ACCOUNT =
  | "account-badge"
  | "account-logout"
  | "account-terms"
  | "account-faq"
  | "account-support"
  | "account-redeem"
  | "account-me"
  | "account-transactions"
  | "account-privacy"
  | "account-how-to-play";
type TIERLEVEL = "tierlevel-double-arrow" | "tierlevel-rank";
type KYC =
  | "kyc-document"
  | "kyc-id"
  | "kyc-camera"
  | "kyc-upload"
  | "kyc-verified"
  | "kyc-flip-camera";

type REDEEM = "redeem-bank" | "redeem-paypal" | "redeem-instant-pay";

type TABS = "home" | "raffle-draw" | "draw-result" | "account";

export type SVGName =
  TABS 
  | "menu"
  | "redeem"
  | "tier-level"
  | "gift"
  | "game-controller"
  | "diamond"
  | "upload"
  | "ach"
  | "bitcoin"
  | "time"
  | "failed"
  | "trophy"
  | "email-sent"
  | "g-home"
  | "g-settings"
  | "logo-name"
  | "logo"
  | "gold-coin"
  | "b-coin"
  | "sc-coin"
  | "silver-coin"
  | "heart"
  | "up"
  | "email"
  | "warning"
  | "earn"
  | "unlock"
  | "exclusive"
  | "elite"
  | INBOX
  | CATEGORIES
  | MENU
  | ACCOUNT
  | TIERLEVEL
  | KYC
  | REDEEM;

export interface IconProps extends SvgProps {
  name: SVGName;
  id?: any;
  size?: number;
  stroke?: string;
  fill?: string;
  fill1?: string;
  isActive?: boolean;
}

const SVGIcon = (props: IconProps) => {
  const { name, width, height } = props;
  switch (name) {
    // TABS
    case "home":
      return <Home width={width || 19} height={height || 20} {...props} />;
    case "menu":
      return <Menu width={width || 26} height={height || 26} {...props} />;
    case "raffle-draw":
      return <Redeem width={width || 24} height={height || 24} {...props} />;
    case "draw-result":
      return <Redeem width={width || 24} height={height || 24} {...props} />;
    case "account":
      return <Account width={width || 21} height={height || 26} {...props} />;

    case "redeem":
      return <Redeem width={width || 23} height={height || 23} {...props} />;
    case "tier-level":
      return <TierLevel width={width || 25} height={height || 25} {...props} />;
    case "logo-name":
      return <LogoName width={width || 72} height={height || 43} {...props} />;
    case "logo":
      return <Logo width={width || 31} height={height || 35} {...props} />;
    case "gold-coin":
      return <Coin width={width || 19} height={height || 19} fill="#F7A60B" />;
    case "b-coin":
      return <BCoin width={width || 19} height={height || 19} />;
    case "sc-coin":
      return <SCCoin width={width || 19} height={height || 19} />;
    case "silver-coin":
      return <Coin width={width || 19} height={height || 19} fill="#8197BB" />;
    case "heart":
      return <Heart width={width || 20} height={height || 19} {...props} />;
    case "up":
      return <Up width={width || 16} height={height || 16} {...props} />;
    case "email":
      return <Email width={width || 40} height={height || 32} {...props} />;
    case "game-controller":
      return <GameController width={width || 15} height={height || 11} {...props} />;
    case "diamond":
      return <Diamond width={width || 16} height={height || 13} {...props} />;
    case "gift":
      return <Gift width={width || 15} height={height || 14} {...props} />;
    case "trophy":
      return <Trophy width={width || 20} height={height || 20} {...props} />;
    case "email-sent":
      return <EmailSent width={width || 108} height={height || 60} {...props} />;
    case "g-home":
      return <GHome width={width || 33} height={height || 37} {...props} />;
    case "g-settings":
      return <GSettings width={width || 37} height={height || 38} {...props} />;
    case "warning":
      return <Warning width={width || 95} height={height || 87} {...props} fill={props.fill ?? "#EBCD75"} />;
    case "earn":
      return <Earn width={width || 56} height={height || 56} {...props} />;
    case "unlock":
      return <Unlock width={width || 56} height={height || 56} {...props} />;
    case "exclusive":
      return <Exclusive width={width || 56} height={height || 56} {...props} />;
    case "elite":
      return <Elite width={width || 56} height={height || 56} {...props} />;

    // CATEGORIES
    case "new":
      return <New width={width || 18} height={height || 17} {...props} />;
    case "slots":
      return <Slots width={width || 12} height={height || 15} {...props} />;
    case "table":
      return <Table width={width || 18} height={height || 16} {...props} />;
    case "instant":
      return <Instant width={width || 12} height={height || 13} {...props} />;
    case "puzzle":
      return <Puzzle width={width || 16} height={height || 17} {...props} />;

    // MENU CATEGORIES
    case "menu-lobby":
      return (
        <MENULobby
          width={width || 23}
          height={height || 23}
          {...props}
          fill={props.fill || Colors.dark.textLabel}
        />
      );
    case "menu-top":
      return (
        <MENUTop
          width={width || 23}
          height={height || 23}
          {...props}
          fill={props.fill || Colors.dark.textLabel}
        />
      );
    case "menu-new":
      return (
        <MENUNew
          width={width || 23}
          height={height || 23}
          {...props}
          fill={props.fill || Colors.dark.textLabel}
        />
      );
    case "menu-feature":
      return (
        <MENUFeature
          width={width || 23}
          height={height || 23}
          {...props}
          fill={props.fill || Colors.dark.textLabel}
        />
      );
    case "menu-slots":
      return (
        <MENUSlots
          width={width || 23}
          height={height || 23}
          {...props}
          fill={props.fill || Colors.dark.textLabel}
        />
      );
    case "menu-table":
      return (
        <MENUTable
          width={width || 23}
          height={height || 23}
          {...props}
          fill={props.fill || Colors.dark.textLabel}
        />
      );
    case "menu-roulette":
      return (
        <MENURoulette
          width={width || 23}
          height={height || 23}
          {...props}
          fill={props.fill || Colors.dark.textLabel}
        />
      );
    case "menu-instant":
      return (
        <MENUInstant
          width={width || 23}
          height={height || 23}
          {...props}
          fill={props.fill || Colors.dark.textLabel}
        />
      );
    case "menu-puzzle":
      return (
        <MENUPuzzle
          width={width || 23}
          height={height || 23}
          {...props}
          fill={props.fill || Colors.dark.textLabel}
        />
      );
    case "menu-arcade":
      return (
        <MENUArcade
          width={width || 23}
          height={height || 23}
          {...props}
          fill={props.fill || Colors.dark.textLabel}
        />
      );
    case "menu-hourglass":
      return (
        <MENUHourglass
          width={width || 9}
          height={height || 11}
          {...props}
          fill={props.fill || Colors.dark.textLabel}
        />
      );
    case "menu-sound":
      return (
        <MENUSound
          width={width || 16}
          height={height || 14}
          {...props}
          fill={props.fill || Colors.dark.textLabel}
        />
      );

    // ACCOUNT CATEGORIES
    case "account-badge":
      return (
        <ACCOUNTBadge
          width={width || 54}
          height={height || 56}
          {...props}
          fill={props.fill || Colors.dark.copper}
        />
      );
    case "account-terms":
      return <ACCOUNTTerms width={width || 23} height={height || 23} {...props} />;
    case "account-logout":
      return <ACCOUNTLogout width={width || 23} height={height || 23} {...props} />;
    case "account-faq":
      return <ACCOUNTFAQs width={width || 23} height={height || 23} {...props} />;
    case "account-support":
      return <ACCOUNTSupport width={width || 23} height={height || 23} {...props} />;
    case "account-redeem":
      return <ACCOUNTRedeem width={width || 23} height={height || 23} {...props} />;
    case "account-me":
      return <ACCOUNTMe width={width || 23} height={height || 23} {...props} />;
    case "account-transactions":
      return <ACCOUNTTransactions width={width || 23} height={height || 23} />;
    case "account-how-to-play":
      return <ACCOUNTHowToPlay width={width || 23} height={height || 23} {...props} />;

    case "account-privacy":
      return <ACCOUNTPrivacy width={width || 23} height={height || 23} {...props} />;

    // TIER LEVEL
    case "tierlevel-double-arrow":
      return <TIERLEVELDoubleArrow width={width || 20} height={height || 13} {...props} />;
    case "tierlevel-rank":
      return <TIERLEVELRank width={width || 20} height={height || 20} {...props} />;

    // KYC
    case "kyc-document":
      return <KYCDocument width={width || 21} height={height || 21} {...props} />;
    case "kyc-id":
      return <KYCID width={width || 22} height={height || 16} {...props} />;
    case "kyc-camera":
      return <KYCCamera width={width || 22} height={height || 18} {...props} />;
    case "kyc-upload":
      return <KYCUpload width={width || 100} height={height || 75} {...props} />;
    case "kyc-verified":
      return <KYCVerified width={width || 15} height={height || 15} {...props} />;
    case "kyc-flip-camera":
      return <FlipCamera width={width || 127} height={height || 127} {...props} />;

    // REDEEM
    case "ach":
      return <ACH width={width || 35} height={height || 34} {...props} />;
    case "bitcoin":
      return <Bitcoin width={width || 36} height={height || 36} {...props} />;
    case "upload":
      return <Upload width={width || 26} height={height || 25} {...props} />;
    case "time":
      return <Time width={width || 125} height={height || 125} {...props} />;
    case "failed":
      return <Failed width={width || 132} height={height || 132} {...props} />;
    case "redeem-bank":
      return <Bank width={width || 28} height={height || 28} {...props} />;
    case "redeem-paypal":
      return <Paypal width={width || 25} height={height || 30} {...props} />;
    case "redeem-instant-pay":
      return <InstantPay width={width || 28} height={height || 28} {...props} />;
    default:
      return null;
  }
};

export default SVGIcon;
