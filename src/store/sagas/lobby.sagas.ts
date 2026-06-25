/* eslint-disable @typescript-eslint/no-unused-vars */
import { SagaIterator } from "@redux-saga/core";
import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import { REHYDRATE } from "redux-persist";
import * as Types from "@/src/store/types";

// Slice
import { uriToBlob } from "@/src/common/utils/transform-helper";
import { router } from "expo-router";
import { selectAuthLoggedIn } from "../slices/auth.slice";
import { lobbyActions, selectKYCInputs } from "../slices/lobby.slice";
import { notificationActions } from "../slices/notification.slice";
import { selectedUserUserID, userActions } from "../slices/user.slice";
import { PurchaseService } from "@/src/api/services/purchase.service";
import { UserService } from "@/src/api/services/user.service";
import { RedeemService } from "@/src/api/services/redeem.service";
import { KYCService } from "@/src/api/services/kyc.service";
import { NotificationService } from "@/src/api/services/notification.service";
import _ from "lodash";
import i18n from "@/src/common/utils/i18n";
import { settingsActions } from "../slices/settings.slice";

function* handleLobbyRequest(): SagaIterator {
  try {
    const isLoggedIn = yield select(selectAuthLoggedIn);

    if (!isLoggedIn) {
      const products = yield call(PurchaseService.products);
      yield put(lobbyActions.products(products));
      return;
    }

    const userDetails = yield call(UserService.profile);
    yield put(userActions.fetchUserDetails(userDetails));

    const products = yield call(PurchaseService.products);
    yield put(lobbyActions.products(products));

    yield put(lobbyActions.lobbySuccess());
  } catch (error: any) {
    yield put(lobbyActions.lobbyFailure(error?.data));
  }
}

function* handleLanguageChange(action: {
  type: string,
  payload: any;
}): SagaIterator {
  try {
    yield call(i18n.changeLanguage, action.payload);
  } catch (error) {
  }
}

// Syncs i18next with the persisted redux language once redux-persist restores
// it on app start, since i18n.init() always boots with its static default and
// otherwise only updates when the user explicitly changes language.
function* handleRehydrate(action: {
  type: string,
  payload: any;
}): SagaIterator {
  try {
    const lang = action.payload?.settings?.lang;

    if (lang) {
      yield call(i18n.changeLanguage, lang);
    }
  } catch (error) {
  }
}

function* handleKYCRequest(action: { type: string; payload: any }): SagaIterator {
  try {
    const inputs = yield select(selectKYCInputs);

    const formdata = new FormData();
    const blob = yield call(uriToBlob, action.payload);
    formdata.append("file", blob as any, "kyc-selfie.jpg");

    const uploadResult = yield call(KYCService.upload, formdata);

    const params = {
      city: inputs.city,
      dateOfBirth: inputs.dateOfBirth,
      firstName: inputs.firstName,
      generation: inputs.generation,
      identityDocuments: [
        {
          backImage: inputs.backImage,
          frontImage: inputs.frontImage,
          type: inputs.type?.value ?? inputs.type,
        },
      ],
      lastName: inputs.lastName,
      middleName: inputs.middleName,
      phoneNumber: inputs.phoneNumber,
      portraitImage: uploadResult.filePath,
      ssn: inputs.ssn,
      state: inputs.state?.name ?? inputs.state,
      street: inputs.street,
      zipCode: inputs.zipCode,
    } as any;

    const result = yield call(KYCService.verify, params);
    yield put(lobbyActions.kycSuccess(result));
    yield put(userActions.updateKYCStatus("PENDING"));
    router.replace("/kyc-verification/pending");
  } catch (error: any) {
    yield put(lobbyActions.kycFailure(error));
  }
}

function* handleRefreshNotification(): SagaIterator {
  try {
    const userId = yield select(selectedUserUserID);

    if (userId) {
      const notifications = yield call(NotificationService.notifications, userId);
      yield put(notificationActions.notifications(notifications.data));

      const result = notifications.data.find(
        (item: any) => item.notificationTypeId === 6 && item.status === "UNREAD",
      );

      if (result) {
        const userDetails = yield call(UserService.profile);
        yield put(userActions.fetchUserDetails(userDetails));

        router.push({
          pathname: "/(modal)/kyc-verification-result",
          params: {
            id: result.id,
            kycStatus: result?.extras?.kycStatus,
          },
        });
      }
    }
  } catch (error: any) {
    // empty
  }
}

// Watcher Saga
function* lobbyWatcherSaga(): SagaIterator {
  yield takeEvery(lobbyActions.lobbyRequest.type, handleLobbyRequest);
  yield takeLatest(settingsActions.updateLanguage.type, handleLanguageChange);
  yield takeLatest(REHYDRATE, handleRehydrate);
  yield takeEvery(lobbyActions.kycRequest.type, handleKYCRequest);
  yield takeEvery(notificationActions.notificationMessage.type, handleRefreshNotification);
}

export default lobbyWatcherSaga;
