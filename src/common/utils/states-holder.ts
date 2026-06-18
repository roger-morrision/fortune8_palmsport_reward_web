export const LOGIN_STATES = {
  username: "",
  password: "",
  ipAddress: "1.1.1.1",
  platform: "WEB",
};

export const SIGNUP_STATES: any = {
  firstName: "",
  lastName: "",
  emailAddress: "",
  username: "",
  password: "",
  cpassword: "",
  dateOfBirth: undefined,
  country: "",
  gender: "",
  refPromoCode: "",
  confirm: false,
} as const;

export const RESET_PASSWORD = {
  password: "",
  cpassword: "",
};

export const CHANGE_PASSWORD_STATES = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export const SEND_MESSAGE = {
  fullName: "",
  email: "",
  message: "",
};

export const CHANGE_USER_DETAILS_STATES = {
  dropdownKey: "",
  // "countryId": null as any,
  // "countryId": 0,
  countryId: {} as any,

  dateOfBirth: "",
  firstName: "",
  genderId: "" as any,
  lastName: "",
  password: "",
  displayName: "",
  userID: 0,
};

export const REDEEM_STATES = {
  goldAmount: "",
  bankFirstName: "",
  bankLastName: "",
  bankName: "",
  bankAccountNumber: "",
  bankSwiftCode: "",
  bankIbanIbcCode: "",
  btcAddress: "",
  isTermsCheck: false,
  redeemStatus: {
    id: 1,
    name: "NEW REQUEST",
  },
  dropdownKey: "",
};
