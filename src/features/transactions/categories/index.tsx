import Button from "@/src/common/components/Button";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { TRANSACTIONS, TRANSACTIONSTYPES } from "@/src/constants/Objects";
import { useTransactionContext } from "@/src/context/TransactionContext";
import React, { useState } from "react";
import { FlatList, LayoutChangeEvent } from "react-native";
import { ids, styles } from "./styles.css";
import { useBreakpoint } from "@/src/constants/BreakPoint";

function ViewWrapper() {
  const [itemWidth, setItemWidth] = useState(0);

  const columnSpace = useBreakpoint({
    mobile: 3,
    tablet: 3,
    default: 4,
  });

  return (
    <View
      onLayout={(e: LayoutChangeEvent) => setItemWidth(e.nativeEvent.layout.width / columnSpace)}
      style={styles.categories_container}
      dataSet={{ media: ids.categories_container }}
    >
      <Categories itemWidth={itemWidth} />
    </View>
  );
}

function Categories({ itemWidth }: { itemWidth: number }) {
  const flatListRef = React.useRef<any>(null);
  const { category, setCategory } = useTransactionContext();

  return (
    <FlatList
      horizontal
      pagingEnabled
      ref={flatListRef}
      data={TRANSACTIONS}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.title}
      renderItem={({ item }) => (
        <CategoryItem
          key={item.title}
          {...{
            item,
            itemWidth,
            isSelected: item.redeemStatusID === category.redeemStatusID,
          }}
          onPress={setCategory}
        />
      )}
    />
  );
}

type Props = {
  item: TRANSACTIONSTYPES;
  isSelected: boolean;
  onPress: (val: TRANSACTIONSTYPES) => void;
  itemWidth: number;
};

function CategoryItem({ item, onPress, isSelected, itemWidth }: Props) {
  return (
    <Button
      style={[
        styles.category_item_container,
        { width: itemWidth },
        isSelected && styles.category_item_container_active,
      ]}
      onPress={() => onPress(item)}
      dataSet={{ media: ids.category_item_container }}
    >
      <Text color={isSelected ? "goldFlat" : "categoryName"}>{item.title}</Text>
    </Button>
  );
}

export default React.memo(ViewWrapper);
