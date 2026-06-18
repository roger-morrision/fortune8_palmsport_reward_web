import * as ScreenOrientation from "expo-screen-orientation";
import React from "react";

const useOrientationListener = () => {
  const [orientation, setOrientation] = React.useState("LANDSCAPE");

  React.useEffect(() => {
    const getOrientation = async () => {
      const orientationInfo = await ScreenOrientation.getOrientationAsync();
      setOrientation(
        orientationInfo === ScreenOrientation.Orientation.PORTRAIT_UP ? "PORTRAIT" : "LANDSCAPE",
      );
    };

    getOrientation();

    const orientationListener = ScreenOrientation.addOrientationChangeListener((event) => {
      const newOrientation = event.orientationInfo.orientation;
      if (newOrientation === ScreenOrientation.Orientation.PORTRAIT_UP) {
        setOrientation("PORTRAIT");
      } else if (
        newOrientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
        newOrientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
      ) {
        setOrientation("LANDSCAPE");
      }
    });

    return () => ScreenOrientation.removeOrientationChangeListener(orientationListener);
  }, []);

  return orientation;
};

export default useOrientationListener;
