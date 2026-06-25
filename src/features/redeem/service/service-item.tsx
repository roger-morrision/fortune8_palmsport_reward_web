import Button from "@/src/common/components/Button";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import SVGIcon, { SVGName } from "@/src/constants/SVGIcon";
import StyleSheet from "react-native-media-query";

type ItemProps = {
  title: string;
  fee: string;
  serviceType: string;
  svg: SVGName;
  subtitle?: string;
  isSelect: boolean;
  onPress: () => void;
};

const ServiceItem = (props: ItemProps) => {
  return (
    <Button
      onPress={props.onPress}
      backgroundColor="secondary"
      borderColor={props.isSelect ? "yellowThick" : "borderColor"}
      style={styles.item_container}
      dataSet={{ media: ids.item_container }}
    >
      <View
        borderColor={"yellowDark"}
        backgroundColor={props.isSelect ? "yellowDark" : "transparent"}
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          borderWidth: 2,
          alignItems: "center",
          justifyContent: "center",
        }}
      />
      <View style={styles.v_text_container}>
        <Text
          color="placeholder"
          fontFamily="Montserrat-Bold"
          style={styles.item_t_title}
          dataSet={{ media: ids.item_t_title }}
        >
          {props.title}
        </Text>
        {/* <Text
          color="placeholder"
          style={styles.item_t_subtitle}
          dataSet={{ media: ids.item_t_subtitle }}
        >
          Service Type: <Text color="text">{props.serviceType}</Text>
        </Text> */}
        <Text
          color="placeholder"
          style={styles.item_t_subtitle}
          dataSet={{ media: ids.item_t_subtitle }}
        >
          Fee: <Text color="text">{props.fee}</Text>
        </Text>
      </View>
      <SVGIcon name={props.svg} />
    </Button>
  );
};

const { ids, styles } = StyleSheet.create({
  // ITEM
  item_container: {
    width: "100%",
    height: 115,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    "@media (max-width: 850px)": {
      paddingLeft: 20,
      paddingRight: 20,
      height: 106,
    },
  },
  v_text_container: { flex: 1, marginLeft: 24, gap: 1 },
  item_t_title: {
    fontSize: 16,
    lineHeight: 22,
    "@media (max-width: 1600px) and (min-width: 996px)": {
      fontSize: 16,
      lineHeight: 22,
    },
  },
  divider: { height: 2 },
  item_t_subtitle: {
    fontSize: 14,
    lineHeight: 20,
    "@media (max-width: 1600px) and (min-width: 996px)": {
      fontSize: 14,
      lineHeight: 20,
    },
  },
});

export default ServiceItem;
