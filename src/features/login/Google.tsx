import Button from "@/src/common/components/Button";
import { WEB_CLIENT_ID } from "@/src/constants/Config";
import { useAssetContext } from "@/src/context/AssetContext";
import { useAuthService } from "@/src/store/hooks";
import * as Google from "expo-auth-session/providers/google";
import React from "react";
import { Image } from "react-native";

const Config = {
  webClientId: WEB_CLIENT_ID,
  useProxy: false,
};

const GoogleButton = () => {
  const { images } = useAssetContext();
  const { signWithGoogle } = useAuthService();
  const [request, response, promptAsync]: any = Google.useIdTokenAuthRequest(Config);

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      signWithGoogle(id_token);
    }
  }, [response]);

  return (
    <Button disabled={!request} onPress={() => promptAsync()}>
      <Image
        source={{ uri: images?.["button-google"]?.uri }}
        style={{ width: 51, height: 51 }}
        resizeMode="stretch"
      />
    </Button>
  );
};

export default GoogleButton;
