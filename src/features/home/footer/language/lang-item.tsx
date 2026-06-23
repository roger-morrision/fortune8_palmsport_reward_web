import BGButton from "@/src/common/components/BGButton";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { Image } from "react-native";
import styles from "./styles.css"

type Props = {
  source: any;
  label: string;
  baseWidth: number;
  baseHeight: number;
  onPress: () => void;
}

const LangItem = ({baseWidth, baseHeight, source, onPress, label }: Props) => {

  return (
    <BGButton
      textColor="text"
      fontFamily="PoppinsMedium"
      bgLocations={[0, 0.95, 1]}
      borderRadius={11}
      label="KJHS"
      onPress={onPress}
      innerStart={{ x: 0, y: 1 }}
      innerEnd={{ x: 0, y: 0 }}
      style={[{ width: baseWidth, height: baseHeight}]}
      strokeColors={["#ffffff", "#ffffff", "#ffffff"]}
      bgColors={["#2061AF", "#69BBFF", "#9ED3FF"]}
      outerLinearStyle={{paddingBottom: 0, paddingLeft: 0, paddingRight: 0}}
      >
        <View style={styles.lang_container}>
          <View style={styles.lang_container}>
            <Image style={{ width: baseWidth * 0.2, marginTop: "1%", 
              height: baseWidth * 0.2 }} 
              source={source} resizeMode="stretch" />
            <Text color="text" 
              fontFamily="PoppinsBold" 
              style={{fontSize: baseWidth * 0.11, marginBottom: "2%",}}
              >{label}
            </Text>
          </View>
        </View>

    </BGButton>
  )
};


export default LangItem;
