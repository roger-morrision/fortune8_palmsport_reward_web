import Button from "@/src/common/components/Button";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { KYC_STEPS, KYC_STEPS_TYPES } from "@/src/constants/Objects";
import { useLocalSearchParams, useRouter } from "expo-router";
import _ from "lodash";
import React, { useMemo } from "react";
import { FlatList } from "react-native";
import { ids, styles } from "./styles.css";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import { selectedKYCCurrentScreen } from "@/src/store/slices/lobby.slice";

function Categories() {
  const flatListRef = React.useRef<any>(null);
  const currentScreen = useAppSelector(selectedKYCCurrentScreen);

  return (
    <View style={styles.categories_container} dataSet={{ media: ids.categories_container }}>
      <FlatList
        horizontal
        pagingEnabled
        ref={flatListRef}
        data={KYC_STEPS}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 25 }} />}
        keyExtractor={(_, key) => key.toString()}
        renderItem={({ item, index }) => (
          <CategoryItem key={index.toString()} isSelected={currentScreen >= index} {...{ item }} />
        )}
      />
    </View>
  );
}

type Props = {
  item: KYC_STEPS_TYPES;
  isSelected: boolean;
};

function CategoryItem({ item, isSelected }: Props) {
  console.log("isSelectedisSelected", isSelected);

  return (
    <View style={styles.category_item_container} dataSet={{ media: ids.category_item_container }}>
      <Text color={isSelected ? "goldFlat" : "categoryName"}>{item.title}</Text>
      <View
        style={[
          styles.category_item_indicator,
          isSelected && styles.category_item_container_active,
        ]}
        dataSet={{ media: ids.category_item_indicator }}
      />
    </View>
  );
}

export default Categories;
