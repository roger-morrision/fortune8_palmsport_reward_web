import { ImageKey } from "./Images";
import Privacy from "./privacy";
import Sweepstakes from "./sweepstakes";
import Terms from "./terms";

export type REDEEM_GUIDELINES_PROPS = {
  step: string;
  description: string;
  source: ImageKey;
};

export const REDEEM_GUIDELINES: REDEEM_GUIDELINES_PROPS[] = [
  {
    step: "1",
    description: "Redeem SweepsCoin for real money",
    source: "guide-1",
  },
  {
    step: "2",
    description: "Submit your Account Details",
    source: "guide-2",
  },
  {
    step: "3",
    description: "Wait for Approval to Receive Your Funds",
    source: "guide-3",
  },
];

export type ABOUTLISTTYPES = {
  title: string;
  pageTitle: string;
  route: string;
  description: string;
};

export type TRANSACTIONSTYPES = {
  title: string;
  redeemStatusID: number | number[];
};

export const TRANSACTIONS: TRANSACTIONSTYPES[] = [
  {
    title: "All",
    redeemStatusID: 0,
  },
  {
    title: "In Progress",
    redeemStatusID: [2, 3, 4, 7, 9, 13],
  },
  {
    title: "Completed",
    redeemStatusID: [5, 12],
  },
  {
    title: "Rejected",
    redeemStatusID: [6, 8],
  },
  {
    title: "Cancelled",
    redeemStatusID: [10, 11],
  },
];

export const ABOUT_LIST: ABOUTLISTTYPES[] = [
  {
    title: "Terms & Conditions",
    route: "terms-and-conditions",
    pageTitle: "Terms & Conditions",
    description: Terms,
  },
  {
    title: "Privacy Policy",
    route: "privacy-policy",
    pageTitle: "Privacy Policy",
    description: Privacy,
  },
  {
    title: "FAQs",
    route: "faqs",
    pageTitle: "FAQ's",
    description: Sweepstakes,
  },
];

export const TERMS_POLICY: ABOUTLISTTYPES[] = [
  {
    title: "Privacy Policy",
    route: "privacy-policy",
    pageTitle: "Gambly — Privacy Policy",
    description:
      "[T]Introduction[/T]\nThis Privacy Policy describes how Gambly collects, uses, and shares personal information ...\n\n[T]Information We Collect[/T]\nRegistration data, identity verification, transaction data, device data, and communications ...\n\n[T]Sources of Information[/T]\nDirectly from you, automatically, and from third parties such as payment processors and KYC vendors ...\n\n[T]How We Use Information[/T]\nTo provide services, verify identity, process sweepstakes, prevent fraud, and comply with law ...\n\n[T]Sharing of Information[/T]\nWith service providers, affiliates, regulators, in corporate transactions, and with your consent ...\n\n[T]Cookies and Tracking Technologies[/T]\nWe use cookies and similar tools for authentication, analytics, personalization, and advertising ...\n\n[T]Data Retention[/T]\nInformation is retained only as long as necessary to fulfill purposes and comply with obligations ...\n\n[T]Security[/T]\nSafeguards are used to protect data, but no system is completely secure ...\n\n[T]Children’s Privacy[/T]\nThe Services are for adults 18+ only; minors' data will be deleted if discovered ...\n\n[T]International Transfers[/T]\nData may be transferred and processed outside your jurisdiction with safeguards ...\n\n[T]State-Specific Privacy Rights[/T]\nCalifornia, Virginia, and Nevada residents have specific rights; requests may be made to support@gambly.casino ...\n\n[T]Changes to This Policy[/T]\nWe may revise this Policy periodically; updates will be posted ...\n\n[T]Contact Information[/T]\nGambly Privacy Office, 333 3rd Ave N, Suite 400, Saint Petersburg, FL 33710; Email: support@gambly.casino",
  },
  {
    title: "Terms & Conditions",
    route: "terms-and-conditions",
    pageTitle: "Gambly — Terms and Conditions",
    description:
      "[T]Introduction and Acceptance of Terms[/T]\nThese Terms and Conditions (“Terms”) constitute a legally binding agreement between you and Gambly ...\n\n[T]Nature of Services[/T]\nGambly provides access to games using Gold Coins (entertainment only) and Sweep Coins (promotional entries) ...\n\n[T]No Purchase Necessary[/T]\nNo purchase is necessary to participate. Making a purchase will not increase chances of winning ...\n\n[T]Eligibility[/T]\nYou must be 18+ and a resident of a permitted jurisdiction. Wyoming residents are permitted under state law ...\n\n[T]Account Registration[/T]\nYou must create an account with accurate information and safeguard your credentials ...\n\n[T]Purchases and Refunds[/T]\nPurchases of Gold Coins are final and non-refundable ...\n\n[T]Sweepstakes Redemptions[/T]\nSweep Coins redeemable subject to verification, 100 SC minimum, playthrough requirement ...\n\n[T]Prohibited Conduct[/T]\nNo multiple accounts, automation, VPN masking, fraud, or chargeback abuse ...\n\n[T]Responsible Play[/T]\nSelf-exclusion, deposit/play limits, and cooling-off periods are available ...\n\n[T]Intellectual Property[/T]\nAll Gambly content is protected. Users are granted a limited, personal license ...\n\n[T]Disclaimer of Warranties[/T]\nThe Services are provided 'as is' without warranties ...\n\n[T]Limitation of Liability[/T]\nLiability limited to $100 or amount spent in the prior 12 months ...\n\n[T]Dispute Resolution and Arbitration[/T]\nAll disputes resolved via binding arbitration in Wyoming. Class action waiver applies ...\n\n[T]Termination[/T]\nWe may suspend or terminate accounts at our discretion ...\n\n[T]Governing Law[/T]\nThese Terms are governed by the laws of Wyoming and the U.S. ...\n\n[T]Contact Information[/T]\nGambly Legal Department, 333 3rd Ave N, Suite 400, Saint Petersburg, FL 33710; Email: support@gambly.casino",
  },
];

export const PROMOTION_POPUPS = {
  STARTER_PACK: "gwz_3.00_3m_silv",
  CHEAPY_TUESDAY: "gwz_4.00_4m_silv",
  WEEKLY_BOOSTER: "gwz_7.00_8m_silv",
  HIGH_ROLLER: "gwz_11.00_13m_silv",
  TGIF: "gwz_7.00_7m_silv",
  DRAGON_ROLLER: "gwz_20.00_25m_silv",
  WHISTLE_WARRIOR: "gwz_20.00_25m_silv",

  PACKAGE_1: "gwz_2.99_2m_silv",
  PACKAGE_2: "gwz_5.99_6m_silv",
  PACKAGE_3: "gwz_10.99_10m_silv",
  PACKAGE_4: "gwz_19.99_20m_silv",
  PACKAGE_5: "gwz_49.99_50m_silv",
  PACKAGE_6: "gwz_74.99_75m_silv",

  PIGGY_BANK: "gwz_7.99_jade",

  // TOPUP OFFER
  PREMIUM_PACK1: "gwz_1.99_1m_silv",
  PREMIUM_PACK2: "gwz_2.99_4.4m_silv",
  PREMIUM_PACK3: "gwz_4.99_10.5m_silv",
} as const;

export type KYC_STEPS_TYPES = {
  title: string;
};

export const KYC_STEPS: KYC_STEPS_TYPES[] = [
  {
    title: "Personal details",
  },
  {
    title: "ID Verification",
  },
  {
    title: "Live Verification",
  },
];

export const RedeemServiceType: Record<"INSTANT" | "BANK_ACCOUNT" | "PAYPAL", string> = {
  INSTANT: "Instant",
  BANK_ACCOUNT: "Bank Transfer",
  PAYPAL: "Paypal",
};
