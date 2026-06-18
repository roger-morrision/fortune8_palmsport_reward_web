/* eslint-disable @typescript-eslint/no-unused-vars */
import { SagaIterator } from "@redux-saga/core";
import { Audio } from "expo-av";
import { call, select, takeEvery } from "redux-saga/effects";

// Slice
import audio from "@/src/constants/Audio";
import { selectSoundEnabled, selectSoundPlaying, soundActions } from "../slices/sound.slice";

let bgSoundObject: any;
let clickSoundObject: any;
let claimSoundObject: any;
let rewardSoundObject: any;
let promotionSoundObject: any;

function* playSoundSaga(): SagaIterator {
  try {
    const soundEnabled = yield select(selectSoundEnabled);

    if (soundEnabled) {
      if (!bgSoundObject) {
        bgSoundObject = new Audio.Sound();
        yield bgSoundObject.loadAsync(audio["lobby-sound"], {
          isLooping: true,
        });
      }
      yield bgSoundObject.playAsync();
    }
  } catch (error: any) {
    // empty
  }
}

function* pauseSoundSaga(): SagaIterator {
  if (bgSoundObject) {
    yield bgSoundObject.pauseAsync();
  }
}

function* enableSoundSaga(): SagaIterator {
  const soundPlaying = yield select(selectSoundPlaying);

  // If the sound was playing, resume playback
  if (soundPlaying) {
    yield call(playSoundSaga);
  }
}

function* handleClickSound(): SagaIterator {
  const soundEnable = yield select(selectSoundEnabled);

  if (clickSoundObject && soundEnable) {
    yield clickSoundObject.playAsync();
  }
}

function* handleClaimSound(): SagaIterator {
  const soundEnable = yield select(selectSoundEnabled);

  if (claimSoundObject && soundEnable) {
    yield claimSoundObject.playAsync();
  }
}

function* handleRewardSound(): SagaIterator {
  const soundEnable = yield select(selectSoundEnabled);

  if (rewardSoundObject && soundEnable) {
    yield rewardSoundObject.playAsync();
  }
}

function* handlePromotionSound(action: { type: string; payload: any }): SagaIterator {
  try {
    const soundEnabled = yield select(selectSoundEnabled);

    if (soundEnabled) {
      if (!promotionSoundObject) {
        promotionSoundObject = new Audio.Sound();
        yield promotionSoundObject.loadAsync(action.payload);
      }
      yield promotionSoundObject.playAsync();
    }
  } catch (error: any) {
    console.log("handlePromotionSound", error);
  }
}

function* unloadPromotionSoundSaga(): SagaIterator {
  try {
    // Reset references to null after unloading
    yield promotionSoundObject.unloadAsync(); // Properly unload sound to free memory
    promotionSoundObject = null;

    console.log("Promotion sounds stopped and unloaded.");
  } catch (error: any) {
    console.error("Error in unloadPromotionSoundSaga:", error);
  }
}

function* stopAllSoundSaga(): SagaIterator {
  try {
    const soundObjects = [bgSoundObject, clickSoundObject, claimSoundObject, rewardSoundObject];

    for (const sound of soundObjects) {
      if (sound) {
        yield sound.unloadAsync(); // Properly unload sound to free memory
      }
    }

    // Reset references to null after unloading
    bgSoundObject = null;
    clickSoundObject = null;
    claimSoundObject = null;
    rewardSoundObject = null;

    console.log("All sounds stopped and unloaded.");
  } catch (error: any) {
    console.error("Error in stopSoundSaga:", error);
  }
}

// Watcher Saga
function* soundWatcherSaga(): SagaIterator {
  // yield takeEvery(soundActions.bgsoundPlay.type, playSoundSaga);
  yield takeEvery(soundActions.bgsoundPause.type, pauseSoundSaga);
  yield takeEvery(soundActions.bgsoundEnable.type, enableSoundSaga);
  yield takeEvery(soundActions.bgsoundDisable.type, stopAllSoundSaga);
}

export default soundWatcherSaga;
