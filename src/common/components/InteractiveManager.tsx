import React, { ReactNode, useEffect, useState } from "react";
import { InteractionManager } from "react-native";
import ActivityIndicator from "./ActivityIndicator";
import View from "./View";

type Props = {
  children: ReactNode;
};

export default function InteractionManagerScreenWrapper({ children }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const interaction = InteractionManager.runAfterInteractions(() => {
      setReady(true);
    });

    return () => interaction.cancel();
  }, []);

  if (!ready) {
    return (
      <View style={{ flex: 1, alignItems: "center", paddingTop: 50 }}>
        <ActivityIndicator animating size="large" color="text" />
      </View>
    );
  }

  return <>{children}</>;
}
