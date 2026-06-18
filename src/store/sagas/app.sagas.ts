import { put, call } from "redux-saga/effects";
import { settingsActions } from "../slices/settings.slice";
import * as Location from "expo-location";
import { SagaIterator } from "@redux-saga/types";
import { LobbyService } from "@/src/api/services/lobby.service";
import qs from "qs";

function* appInitSaga(): SagaIterator {
  try {
    const { status } = yield call(Location.requestForegroundPermissionsAsync);
    let payload = "";

    if (status === "granted") {
      const location = yield call(Location.getCurrentPositionAsync, {
        accuracy: Location.Accuracy.Highest,
      });

      payload = qs.stringify({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        accuracy: location.coords.accuracy,
      });
    }

    const result = yield call(LobbyService.restriction, payload);

    yield put(settingsActions.updateGeoLocationStatus(result.allowed));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: any) {
    /* empty */
  }
}

export default appInitSaga;
