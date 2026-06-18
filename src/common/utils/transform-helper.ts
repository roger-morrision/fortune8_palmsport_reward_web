import { Product } from "@/src/store/types";
import _ from "lodash";
import moment from "moment";
import { useMemo } from "react";

// SWITCH GAMES BETWEEN FAVORITE/UNFAVORITE
export const switchSelectedFavoriteGames = (games: any, id: number) => {
  return games.map((game: any) => {
    if (game.child) {
      // Handle nested items
      return {
        ...game,
        child: game.child.map((item: any) => {
          if (item.id === id) {
            return { ...item, isFavourite: !item.isFavourite };
          }
          return item;
        }),
      };
    } else if (game.id === id) {
      // Handle top-level items
      return { ...game, isFavourite: !game.isFavourite };
    }
    return game;
  });
};

// REPLACE STRING IN JSON/ARRAY FILE
export const replaceStringInJson = (jsonObj: any, oldString: string, newString: string) => {
  // Check if jsonObj is an object
  if (typeof jsonObj !== "object" || jsonObj === null) {
    return jsonObj;
  }

  // If jsonObj is an array, iterate through each element
  if (Array.isArray(jsonObj)) {
    for (let i = 0; i < jsonObj.length; i++) {
      jsonObj[i] = replaceStringInJson(jsonObj[i], oldString, newString);
    }
  } else {
    // If jsonObj is an object, iterate through each key-value pair
    for (const key in jsonObj) {
      if (jsonObj.hasOwnProperty(key)) {
        // Recursively call replaceStringInJson for nested objects/arrays
        jsonObj[key] = replaceStringInJson(jsonObj[key], oldString, newString);

        // Check if the current value is a string and replace the oldString
        if (typeof jsonObj[key] === "string") {
          jsonObj[key] = jsonObj[key].replace(new RegExp(oldString, "g"), newString);
        }
      }
    }
  }

  return jsonObj;
};

// COMPARE TWO ARRAYS TO CHECK IF THE MISSION IS COMPLETED
export const compareMissionsBeforeAndAfter = (incompleteArray: any, completedArray: any) => {
  // Create a set of completed ids for faster lookup
  const completedIdSet = new Set(completedArray.map((item: any) => item.id));

  // Map over the incompleteArray and add isNewlyCompleted property
  const resultArray = incompleteArray.map((item: any) => {
    const completedItem = completedArray.find((completedItem: any) => completedItem.id === item.id);

    if (
      completedIdSet.has(item.id) &&
      completedArray.find(
        (completedItem: any) =>
          completedItem.id === item.id &&
          completedItem.status === "COMPLETED" &&
          item.status === "ACTIVE",
      )
    ) {
      return { ...item, hasKey: true, ...completedItem };
    } else {
      return {
        ...item,
        progressPercentage: completedItem?.progressPercentage ?? item.progressPercentage,
      };
    }
  });

  return resultArray;
};

// UPDATE CATEGORIES
export const filterTabRoutes = (routes: any[]) => {
  const allowedNames = ["menu", "redeem", "index", "tier-level", "account"];
  return routes.filter((item) => allowedNames.includes(item.name));
};

export const getSilverGold = (array: any = []) => {
  const coinTypes = ["SILVER", "GOLD", "GOLD BONUS"];
  const balanceByCoinType: any = {};

  // Initialize balance for each coin type to 0
  coinTypes.forEach((coinType) => {
    balanceByCoinType[coinType] = 0;
  });

  // Calculate the balance for each coin type
  array.forEach((item: any) => {
    const coinTypeName = item.coinType.name;
    if (coinTypes.includes(coinTypeName)) {
      balanceByCoinType[coinTypeName] += item.amount;
    }
  });

  return balanceByCoinType;
};

// FILTER PRODUCT
export const getProductByType = (product: any[], type: string) => {
  return product.filter((item) => item.description.toLowerCase().startsWith(type.toLowerCase()));
};

// UPDATE CURRENT BALANCES WITH NEW BALANCES
export const updateWalletBalances = (oldWallet: any[], newWallet: any[]) => {
  const hasCoinType = newWallet.some((item) => item.coinType && typeof item.coinType === "object");

  if (_.isEmpty(oldWallet) && hasCoinType) {
    return newWallet;
  }

  const walletMap = new Map(newWallet.map((item) => [item.coinTypeId, item.balance]));

  return oldWallet.map((wallet) => ({
    ...wallet,
    amount:
      Number(wallet.amount) === 0
        ? (walletMap.get(wallet.coinType.id) ?? wallet.amount)
        : wallet.amount,
  }));
};

// UPDATE CURRENT BALANCES WITH NEW BALANCES
export const forceUpdateWalletBalances = (
  oldWallet: any[],
  newWallet: any[],
  forceAdd: Record<string, number> = {},
) => {
  const hasCoinType = newWallet.some((item) => item.coinType && typeof item.coinType === "object");

  // If oldWallet is empty but newWallet has coinType info
  if (_.isEmpty(oldWallet) && hasCoinType) {
    return newWallet;
  }

  const updatedArray = oldWallet.map((oldItem) => {
    const coinName = oldItem.coinType?.name;
    const newItem = newWallet.find((n) => n.coinTypeId === oldItem.coinType.id);

    let updatedAmount = oldItem.amount;

    if (newItem) {
      if (newItem.balance !== oldItem.amount) {
        // If new balance differs, replace with new balance
        updatedAmount = newItem.balance;
      } else {
        // If balances are same, force add
        updatedAmount = oldItem.amount + (forceAdd[coinName] || 0);
      }
    } else {
      // If not found in newWallet, still allow forceAdd
      updatedAmount = oldItem.amount + (forceAdd[coinName] || 0);
    }

    return { ...oldItem, amount: updatedAmount };
  });

  return updatedArray;
};

export const userRewardsUpdate = (userRewards: any[], userRewardsId: any) => {
  return userRewards.map((item: any) => {
    if (item.id === userRewardsId) {
      return { ...item, status: "CLAIMED" };
    } else {
      return item;
    }
  });
};

// CONVERT SERVER TIME INTO READABLE
export const convertServerTime = (serverTime: number) => {
  if (serverTime === 0) {
    return 0;
  }

  const today: Date = new Date(serverTime);

  today.setDate(today.getDate() + 1);

  const date = moment(serverTime).format("YYYY-MM-DD HH:mm:ss");
  const nextday = moment(today).format("YYYY-MM-DD 00:00:00");
  const seconds = moment.duration(moment(nextday).diff(date)).asSeconds();

  return seconds;
};

// CHECK MISSIONS COMPLETED
export const checkMissionsKeys = (newState: any, type: any) => {
  newState = newState.reduce((result: any, value: any) => {
    if (type === "clearkey" && value.hasKey) {
      result.push({
        ...value,
        hasKey: null,
      });

      return result;
    }

    if (typeof type === "object" && value.id === type.id) {
      result.push(type);
      return result;
    }

    result.push(value);

    return result;
  }, []);

  return newState;
};

// UPDATE NOTIFICATIONS READ STATUS
export const readNotification = (newState: any[], notifcationDetals: any) => {
  const itemIndex = _.find(newState, { id: notifcationDetals.id });

  if (itemIndex.status === "READ") {
    return newState;
  }

  return _.map(newState, (item: any) => {
    if (item.id === notifcationDetals.id && item.status !== "READ") {
      return { ...item, ...notifcationDetals };
    } else {
      return item;
    }
  });
};

// UPDATE NOTIFICATIONS STATUS TO READ ALL
export const readAllNotification = (newState: any[]) => {
  return _.map(newState, (item: any) => {
    return { ...item, status: "READ" };
  });
};

// UPDATE NOTIFICATIONS TO REMOVE ITEM
export const deleteNotification = (newState: any[], notifcationDetals: any) => {
  const index = _.findIndex(newState, { id: notifcationDetals.id });

  if (index !== -1) {
    newState.splice(index, 1);
  }

  return newState;
};

// Map product names to available days
const availabilityMap: Record<string, number[]> = {
  "Starter Pack": [0, 1, 2, 3, 4, 5, 6], // everyday
  "Weekly Booster": [1], // Wednesday
  "Cheapy Tuesday": [2], // Tuesday
  "High Roller Pack": [3], // Wednesday
  "TGIF Offer": [5], // Wednesday
  "Dragon Roller": [0, 1, 2, 3, 4, 5, 6], // everyday
};

export function getAvailableProducts(products: Product[]) {
  const today = new Date().getDay();
  // getDay(): 0=Sunday, 1=Monday, 2=Tuesday, ... 6=Saturday

  return products.filter((p) => {
    const allowedDays = availabilityMap[p.description];
    return p.isHotDeal && allowedDays?.includes(today);
  });
}

export function getAvailableHotDealsProducts(products: Product[]) {
  if (!products) return [];

  return products.filter((p) => {
    return p.isHotDeal;
  });
}

export const redeemStatusName = (status: number) => {
  switch (status) {
    case 1:
      return "Request submit";
    case 2:
      return "Email verified";
    case 3:
      return "Review in progress";
    case 4:
      return "Request approved";
    case 5:
      return "Completed";
    case 6:
      return "Rejected";
  }
};

export const redeemTypeName = (idType: number) => {
  switch (idType) {
    case 1:
      return "Bank Transfer";
    case 2:
      return "Paypal";
    case 3:
      return "Gift Card";
    case 4:
      return "Promotion Product";
    case 7:
      return "ACH";
    case 8:
      return "BITCOIN";
    case 9:
      return "Instant Pay";
  }
};

export const RedeemTransaction = (array: [] = []) => {
  return array.map((item: any) => {
    item.redeemStatus = redeemStatusName(item.redeemStatusID);
    item.redeemType = redeemTypeName(item.redeemTypeID);
    return item;
  });
};

type Upload = {
  documentType: {
    name: string;
  };
};

// FILTER AVAILABLE IDs FROM UPLOADED IDs
export const filterAvailableDocumentTypes = (
  uploads: Upload[],
  allOptions: string[],
  alwaysInclude: string[] = ["Other"],
): string[] => {
  const uploadedNames = uploads.map((item) => item.documentType.name);

  return allOptions.filter((option) => {
    if (alwaysInclude.includes(option)) return true;
    return !uploadedNames.includes(option);
  });
};

export async function uriToBlob(uri: string): Promise<Blob> {
  const res = await fetch(uri);
  const blob = await res.blob();
  return blob;
}
