import { SagaIterator } from "@redux-saga/core";
import { Audio } from "expo-av";
import { call, select, takeEvery } from "redux-saga/effects";

// Slice
import audio from "@/src/constants/Audio";
import { selectSoundEnabled, selectSoundPlaying, soundActions } from "../slices/sound.slice";

let bgSoundObject: any;
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
    if (bgSoundObject) {
      yield bgSoundObject.unloadAsync();
      bgSoundObject = null;
    }
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
