import useAppDispatch from "@/src/common/hooks/useAppDispatch";
import { useCallback } from "react";
import { soundActions } from "../slices/sound.slice";

type ServiceOperators = {
  bgsoundPlay: () => void;
  bgsoundPause: () => void;
  bgsoundEnable: () => void;
  bgsoundDisable: () => void;
  clickSoundToggle: () => void;
  claimSoundToggle: () => void;
  rewardSoundToggle: () => void;

  // GOLDEN BALL
  goldenBallIntroSoundToggle: () => void;
  goldenBallOpeningSoundToggle: () => void;
  unloadGoldenBallSoundToggle: () => void;

  // PROMOTIONAL
  promotionSoundToggle: (audio: any) => void;
  unloadPromotionSound: () => void;
};

export const useSoundService = (): Readonly<ServiceOperators> => {
  const dispatch = useAppDispatch();

  return {
    bgsoundPlay: useCallback(() => dispatch(soundActions.bgsoundPlay()), [dispatch]),
    bgsoundPause: useCallback(() => dispatch(soundActions.bgsoundPause()), [dispatch]),
    bgsoundEnable: useCallback(() => dispatch(soundActions.bgsoundEnable()), [dispatch]),
    bgsoundDisable: useCallback(() => dispatch(soundActions.bgsoundDisable()), [dispatch]),
    clickSoundToggle: useCallback(() => dispatch(soundActions.clickSoundToggle()), [dispatch]),
    claimSoundToggle: useCallback(() => dispatch(soundActions.claimSoundToggle()), [dispatch]),
    rewardSoundToggle: useCallback(() => dispatch(soundActions.rewardSoundToggle()), [dispatch]),

    // GOLDEN BALL
    goldenBallIntroSoundToggle: useCallback(
      () => dispatch(soundActions.goldenBallIntroToggle()),
      [dispatch],
    ),
    goldenBallOpeningSoundToggle: useCallback(
      () => dispatch(soundActions.goldenBallOpeningChestToggle()),
      [dispatch],
    ),
    unloadGoldenBallSoundToggle: useCallback(
      () => dispatch(soundActions.unloadGoldenBallSound()),
      [dispatch],
    ),

    // PROMOTIONAL
    promotionSoundToggle: useCallback(
      (audio) => dispatch(soundActions.promotionSoundToggle(audio)),
      [dispatch],
    ),
    unloadPromotionSound: useCallback(
      () => dispatch(soundActions.unloadPromotionSound()),
      [dispatch],
    ),
  };
};
