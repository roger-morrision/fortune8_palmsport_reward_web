import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import React from "react";
import StyleSheet from "react-native-media-query";

type Props = {
  title: string;
  description: string;
};

function DisplayItem(props: Props) {
  return (
    <View
      backgroundColor="blueDark"
      borderColor="blueBorder"
      style={styles.box_container}
      dataSet={{ media: ids.box_container }}
    >
      <Text style={styles.title_style} color="goldFlat">
        {props.title}
      </Text>
      <Description text={props.description} />
    </View>
  );
}

const Description = ({ text }: { text: string }) => {
  // Split the text by [T]...[/T] and mark which parts are bold
  const parts = text.split(/\[T\](.*?)\[\/T\]/g);

  return (
    <Text color="text" style={styles.description_style} dataSet={{ media: ids.description_style }}>
      {parts.map((part, index) => {
        // Odd indices are inside [T]...[/T], so they should be bold
        const isBold = index % 2 === 1;
        return (
          <Text
            key={index}
            fontFamily={isBold ? "Montserrat-Bold" : "Montserrat-Light"}
            style={isBold ? styles.description_header_style : styles.description_style}
            dataSet={{ media: isBold ? ids.description_header_style : ids.description_style }}
          >
            {part}
          </Text>
        );
      })}
    </Text>
  );
};

const { ids, styles } = StyleSheet.create({
  box_container: {
    gap: 20,
    width: "100%",
    minHeight: 179,
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 9.13,
    borderWidth: 1.83,
    "@media (min-width: 1600px)": {
      paddingLeft: 83,
      paddingRight: 83,
    },
    "@media (min-width: 900px)": {
      paddingLeft: 70,
      paddingRight: 70,
    },
  },
  title_style: {
    fontSize: 16,
    lineHeight: 18,
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "Montserrat-Bold",
  },
  description_header_style: {
    fontSize: 15,
    lineHeight: 23,
  },
  description_style: {
    fontSize: 13,
    lineHeight: 19,
  },
});

export default DisplayItem;
