import React from 'react';
import _ from 'lodash';
import useStyles from './styles.css';
import { FlatList, Pressable, Text, View } from 'react-native';
import { paginateArray } from '@/src/common/utils/transform-helper';

const ITEM_WIDTH = 20;

type PaginationProps = {
  page: number;
  count: number;
  options: any[];
  rowsPerPage: number;
  onPageChange: (value: any) => void;
  onRowsPerPageChange: (value: any) => void;
}

const PaginationNumber = (props: PaginationProps) => {
  const styles = useStyles();
  const flatListRef = React.useRef<any>(null);
  const Pages = React.useMemo(() => paginateArray(props.options, props.rowsPerPage || 2),[props.options]);

  const scrollToIndex = () => {
    const offset = (props.page * ITEM_WIDTH);
    flatListRef.current.scrollToOffset({ offset, animated: true });
  };

  React.useEffect(() => {
    if(flatListRef?.current){
      scrollToIndex();
    }
  },[props.page]);

  if(Pages.length <= 1) return null;

  return (
    <View style={styles.container} >
      <FlatList 
        horizontal
        pagingEnabled
        ref={flatListRef}
        scrollEnabled={false}
        style={{width: ITEM_WIDTH * 7}}
        showsHorizontalScrollIndicator={false}
        data={_.range(Pages.length)}
        ItemSeparatorComponent={() => <View style={{width: 10}} />}
        renderItem={({item, index}) => {
          return (
            <Pressable key={index.toString()}
              onPress={() => props.onPageChange(item)}
              style={styles.v_numbers} >
              <Text style={[styles.t_number, 
                props.page === item && styles.t_number_active]}>
                {item + 1}
              </Text>
            </Pressable>
          )
        }} />
      {Pages.length > 1 && <View style={styles.v_actions}>
        {props.page > 0 && <Pressable onPress={() => props.onPageChange(props.page - 1)}>
          <Text style={styles.t_next}>PREV</Text>
        </Pressable>}
        {(props.page > 0 && ((Pages.length - 1) > props.page)) && <View style={styles.v_line_separator} />}
        {(Pages.length - 1) > props.page && <Pressable onPress={() => props.onPageChange(props.page + 1)}>
          <Text style={styles.t_next}>NEXT</Text>
        </Pressable>}
      </View>}
    </View>
  );
};

export default PaginationNumber;
