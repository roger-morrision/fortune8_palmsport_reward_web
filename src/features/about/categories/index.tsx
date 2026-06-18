import Button from "@/src/common/components/Button";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { ABOUT_LIST, ABOUTLISTTYPES } from "@/src/constants/Objects";
import { useLocalSearchParams, useRouter } from "expo-router";
import _ from "lodash";
import React, { useMemo } from "react";
import { FlatList } from "react-native";
import { ids, styles } from "./styles.css";

function Categories() {
  const router = useRouter();
  const { page } = useLocalSearchParams();
  const flatListRef = React.useRef<any>(null);

  const currentIndex = useMemo(() => {
    return _.findIndex(ABOUT_LIST, ["route", page]);
  }, [page]);

  const scrollToIndex = () => {
    const offset = currentIndex * 110;

    flatListRef.current.scrollToOffset({ offset, animated: true });
  };

  React.useEffect(() => {
    if (flatListRef?.current) {
      scrollToIndex();
    }

    if (currentIndex === -1) {
      router.replace("/about/" + ABOUT_LIST[0].route);
    }
  }, [currentIndex]);

  const handleClickItem = (route: string) => {
    router.replace("/about/" + route);
  };

  return (
    <View style={styles.categories_container} dataSet={{ media: ids.categories_container }}>
      <FlatList
        horizontal
        pagingEnabled
        ref={flatListRef}
        data={ABOUT_LIST}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, key) => key.toString()}
        renderItem={({ item, index }) => (
          <CategoryItem key={index.toString()} {...{ item, page }} onPress={handleClickItem} />
        )}
      />
    </View>
  );
}

type Props = {
  page: string | string[];
  item: ABOUTLISTTYPES;
  onPress: (val: string) => void;
};

function CategoryItem({ page, item, onPress }: Props) {
  const isSelected = useMemo(() => {
    return page === item.route;
  }, [page, item.route]);

  return (
    <Button
      style={[styles.category_item_container, isSelected && styles.category_item_container_active]}
      onPress={() => onPress(item.route)}
      dataSet={{ media: ids.category_item_container }}
    >
      <Text color={isSelected ? "goldFlat" : "categoryName"}>{item.title}</Text>
    </Button>
  );
}

export default Categories;
