import Button from "@/src/common/components/Button";
import { FB_APP_ID } from "@/src/constants/Config";
import { useAssetContext } from "@/src/context/AssetContext";
import { useAuthService } from "@/src/store/hooks";
import FacebookLogin from "@greatsumini/react-facebook-login";
import React from "react";
import { Image } from "react-native";

const Facebook = () => {
  const { images } = useAssetContext();
  const { signWithFacebook } = useAuthService();

  return (
    <FacebookLogin
      appId={FB_APP_ID}
      initParams={{ version: "v16.0" }}
      onSuccess={(res: any) => {
        signWithFacebook(res.accessToken);
      }}
      onFail={() => {}}
      onProfileSuccess={() => {}}
      render={({ onClick }: any) => (
        <Button onPress={onClick}>
          <Image
            source={{ uri: images?.["button-facebook"]?.uri }}
            style={{ width: 51, height: 51 }}
            resizeMode="stretch"
          />
        </Button>
      )}
    />
  );
};

export default Facebook;
