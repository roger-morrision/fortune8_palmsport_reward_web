import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { MaterialIcon } from "@/src/common/components/Icon";
import { useState } from "react";
import { Pressable } from "react-native";
import StyleSheet from "react-native-media-query";

const PLACEHOLDER_TERMS = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

type Props = {
  content?: string;
};

export default function DrawTerms({ content = PLACEHOLDER_TERMS }: Props) {
  const [expanded, setExpanded] = useState(true);

  return (
    <View backgroundColor="blueDark" style={styles.container} dataSet={{ media: ids.container }}>

      <Pressable style={styles.header} onPress={() => setExpanded((v) => !v)}>
        <Text fontFamily="Montserrat-Bold" color="text" style={styles.t_title} dataSet={{ media: ids.t_title }}>
          DRAW TERMS AND CONDITIONS
        </Text>
        <MaterialIcon
          disabled
          name={expanded ? "expand-less" : "expand-more"}
          size={24}
          color="text"
        />
      </Pressable>

      {expanded && (
        <View style={styles.v_content}>
          {content.split("\n\n").map((para, i) => (
            <Text
              key={i + "index"}
              fontFamily="Montserrat"
              color="text"
              style={styles.t_content}
              dataSet={{ media: ids.t_content }}
            >
              {para.trim()}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: "hidden",
    alignSelf: "center",
    width: "100%",
    maxWidth: 1084,
    marginTop: 24,
    marginBottom: 25,
    borderWidth: 2,
    borderColor: "#1C3470",
    backgroundColor: "#051338",
    "@media (max-width: 800px)": {
      borderRadius: 8,
      marginTop: 48,
      marginBottom: 40,
    },
  },
  gradient: {
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 18,
    "@media (max-width: 800px)": {
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
  },
  t_title: {
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.5,
    flex: 1,
    "@media (max-width: 800px)": {
      fontSize: 15,
      lineHeight: 20,
    },
  },
  v_content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 14,
    "@media (max-width: 800px)": {
      paddingHorizontal: 16,
      paddingBottom: 20,
      gap: 12,
    },
  },
  t_content: {
    fontSize: 14,
    lineHeight: 22,
    opacity: 0.85,
    "@media (max-width: 800px)": {
      fontSize: 13,
      lineHeight: 20,
    },
  },
});
