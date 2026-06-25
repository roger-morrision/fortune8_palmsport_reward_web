import BGButton from '@/src/common/components/BGButton';
import { FB_APP_ID } from "@/src/constants/Config";
import { useAssetContext } from '@/src/context/AssetContext';
import { useAuthService } from "@/src/store/hooks";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { Image, useWindowDimensions } from "react-native";

const Facebook = () => {
  const { images } = useAssetContext();
  const { width } = useWindowDimensions();
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
        <BGButton
          label="FB"
          onPress={onClick}
          strokeColors={["#A8340F", "#FFCB00E3", "#A8340F"]}
          bgColors={["#3D0700", "#3D0700"]}
          style={{width: width * 0.045, height: width * 0.045}}
          >
          <Image style={{width: "66%", height: "66%"}} source={{uri: images?.["fb-logo"].uri}} />
        </BGButton>
      )}
    />
  );
};

export default Facebook;
