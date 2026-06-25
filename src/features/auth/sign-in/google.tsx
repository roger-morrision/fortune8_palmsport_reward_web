import BGButton from '@/src/common/components/BGButton';
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID, WEB_CLIENT_ID } from "@/src/constants/Config";
import { useAssetContext } from '@/src/context/AssetContext';
import { useAuthService } from "@/src/store/hooks";
import * as GoogleAuth from "expo-auth-session/providers/google";
import React from "react";
import { Image } from "react-native";

const Google = () => {
  const { signWithGoogle } = useAuthService();
  const { images } = useAssetContext();
  const [request, response, promptAsync]: any = GoogleAuth.useIdTokenAuthRequest({
     iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
    // scopes: ['openid', 'profile', 'email'],
    // useProxy: false,
  });

  React.useEffect(() => {

    if (response?.type === "success") {
      const { id_token } = response.params;
      signWithGoogle(id_token);
    }
  }, [response]);

  return (
    <BGButton
      label="Google"
      disabled={!request} onPress={() => promptAsync()}
      strokeColors={["#A8340F", "#FFCB00E3", "#A8340F"]}
      bgColors={["#3D0700", "#3D0700"]}
      style={{width: "100%", height: "100%"}}
      // onPress={onChange}
    >
      <Image style={{width: "66%", height: "66%"}} source={{uri: images?.["google-logo"].uri}} />
    </BGButton>
  );
};

export default Google;
