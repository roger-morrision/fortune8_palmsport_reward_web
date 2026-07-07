export type Token = {
  token?: string;
};

export type partnerId = string;

export type ErrorMessage = {
  errorMessage: string;
};

export type Coordinate = {
  latitude: number;
  longitude: number;
  accuracy: number;
};

export type Login = {
  username: string;
  password: string;
  ipAddress: string;
  platform: string;
} & Coordinate &
  ErrorMessage;

export type OTPVerify = {
  email: string;
  otpCode: string;
};

export type Signup = {
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  password?: string;
  gender?: string | number;
  country?: string | any;
  displayName?: string;
  dateOfBirth?: string;
  refPromoCode?: string;
  changeOnNextLogon: number;
  apiKey: string;
  userTypeID: number;
  provinceId: number;
} & Token;

export type Forgot = {
  email: string;
} & partnerId;

export type ResetPasswordInput = {
  code: string | string[];
  newPassword: string;
  userId: string | string[];
};

export type ChangePasswordTypes = {
  email: string;
  password: string;
  reset_password: string;
};

export type ForgotValue = {
  email: string;
  deviceType: string;
} & Token;

export type SessionValue = {
  accessToken: string;
  expiresIn: number;
  tokenType?: string;
  refreshToken?: string;
  sessionId?: string;
  email?: string;
};

export type UserDetailValue = {
  id?: number;
  userId?: number;
  userRewardsId?: string | number;
  userBalanceList?: any[];
  userRewards?: any[];
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  emailAddress?: string;
  userDetail?: any;
  email?: any;
};

export type ErrorValue = {
  status?: number;
  success?: boolean;
  message?: string;
  error?: string;
  code?: string;
};

export type UpdateUserValue = {
  id: string;
  email?: string;
  password?: string;
  givenName?: string;
  lastName?: string;
  role?: string;
  office?: string;
  displayPhoto?: string;
  position?: string;
  status?: string;
  phoneNumber?: string;
};

export type HourlyReward = {
  id?: string;
  initialDate?: string;
  claimDate?: string;
};

export type ChangeScreen = {
  screen?: string;
  gmode?: string;
};

export type ChangeAvatar = {
  userID?: string;
  avatarID?: string;
};

export type UserRank = {
  rank?: number;
  userID?: string;
  totalScore?: number;
};

export type DailyReward = {
  userId?: number;
  rewardName?: string;
} & Token;

export type GameMode = {
  userId?: number;
  code?: number;
  gamecode?: string | number;
  gameName?: string;
  timestamp?: number;
  gameTypeId: number;
  gameCategoryId?: number;
  packageFilePath?: string;
  missions?: any[];
  missionId?: number;
  currency?: string;
} & Token;

export type SwordPlayInit = {
  cpOrderId?: string;
  currency?: string;
  productId?: string;
  serverId?: string;
  extParams?: string;
  productDesc?: string;
  productName?: string;
  productNumber?: string;
  productPrice?: number;
  userId?: number;
};

export type SwordPlayCB = {
  account?: number;
  coin?: number;
  cpOrderId?: string;
  money?: number;
  productId?: string;
  serverId?: string;
};

export type Transaction = {
  amount?: number;
  currency?: string;
  emailAddress?: string;
  paymentRefNo?: string;
  paymentTypeID?: number;
  purchaseItem?: string;
  silverCoin?: number;
  status?: string;
  transactionDate?: string;
  transactionNo?: string;
  userID?: number;
  userId?: number;
  isJadeEgg?: boolean;
  isShop?: boolean;
  isSubscription?: boolean;
} & Token;

export type Subscription = {
  userId?: number;
  paymentRefNo?: string;
  subscriptionId?: string;
} & Token;

export type Product = {
  id?: number;
  name: string;
  description: string;
  goldBonus: number;
  isActive?: number;
  price?: number;
  value?: number;
  isHotDeal?: boolean;
};

export type TierName = "copper" | "bronze" | "silver" | "gold";

export type TierLevel = {
  id: number;
  name: TierName;
  minAmount: number;
  maxAmount: number;
  minSpentAmount: number;
  silverCoinBonus: number;
  lastModifiedDate: string;
  enrollmentDate: string;
};

export type TierBonus = {
  id: number;
  userId: number;
  bonus: number;
  tierUpgradedTime: string;
  isClaimed: number;
  oldTierLevel: TierLevel;
  newTierLevel: TierLevel;
};

export type Favourite = {
  gameId: string;
  userId: string;
};

export type IDDocumentValue = {
  backImage: string;
  frontImage: string;
  idNumber: string;
  type: string;
};

export type KYCValue = {
  city: string;
  dateOfBirth: string;
  firstName: string;
  generation: string;
  identityDocuments: IDDocumentValue;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  portraitImage: string;
  ssn: string;
  state: string;
  street: string;
  zipCode: string;

  backImage: string;
  frontImage: string;
  idNumber: string;
  type: string;

  dropdownKey: string;
  currentScreen: number;
};

export type Redeem = {
  accountType: string;
  isTermsCheck: boolean;
  goldAmount: string;
  serviceType: "INSTANT" | "BANK_ACCOUNT" | "PAYPAL";
  serviceTypeError: string;
  userID: number;
  payoutInstrumentId: number;
  bankFirstName: string;
  bankLastName: string;
  bankName: string;
  bankSwiftCode: string;
  bankAccountType: string;
  bankAccountNumber: string;
  bankIbanIbcCode: string;
  paypalUserName: string;
  paypalEmail: string;
  paypalFirstName: string;
  paypalLastName: string;
  redeemType: {
    id: number;
  };
};

export type Transactions = {
  userID: number;
  sort: string;
  page: number;
  size: number;
  redeemStatusIDs?: number | number[];
};

export type RedeemEmailVerification = {
  requestId: number;
  userId: number;
  verificationCode: string;
};

export type CreatePayoutInstrument = {
  bank_deposit_sub_type: "BANK_ACCOUNT" | "PAYPAL";
  attribute_payload: {
    bank_account_number?: string;
    bank_routing_number?: string;
    bank_account_type?: string;
    paypal_email?: string;
  };
};

export type PayoutProcess = {
  user_id: number;
  payout_instrument_id: number;
  source_amount: number;
  auto_commit: boolean;
  notify_user: boolean;
  otp_id: number;
  otp_code: string;
};

export type PayoutTransactions = {
  payout_progress_status: string;
};

export type MassPayoutTransaction = {
  id: number;
  creditAmount: number;
  status: string;
  redeemType: string;
  redeemTypeID: number;
  redeemStatusID: number;
  redeemStatusName: string;
  fee: number;
  completedDate: string;
  expiration: string;
  client_transfer_id: string;
  payout_instrument_id: number;
  cashback_redeem_request_id: null;
  status_reason: string;
  pickup_code: string;
  trace_code: string;
  source_currency_code: string;
  destination_currency_code: string;
  source_amount: number;
  destination_amount: number;
  exchange_rate: number;
  actual_payout_fee: number;
  payer_name: string;
  delivery_type: string;
  country_code: string;
  estimated_availability: string;
  commit_status: string;
  cancellation_status: string;
  cancellation_status_reason: string;
  confirmation_code: string;
  message_to_receiver: string;
  created_at: string;
  updated_at: string;
  lastUpdatedTime: string;
};

export type FeedBack = {
  userId: number;
  email: string;
  fullName: string;
  message: string;
};
