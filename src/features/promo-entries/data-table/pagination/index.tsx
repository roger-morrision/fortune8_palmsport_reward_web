import colors from "@assets/colors";
import Icon from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import RowsPerPage from "./rows-per-page";
import useStyles from "./styles.css";

type PaginationProps = {
  page: number;
  count: number;
  rowsPerPage: number;
  rowsPerPageOptions: number[];
  onPageChange: (value: any) => void;
  onRowsPerPageChange: (value: any) => void;
}

const Pagination = (props: PaginationProps) => {
  const styles = useStyles();
  const { page, rowsPerPage, count } = props;
  const value = React.useMemo(() => {
    const to = (page + 1) * rowsPerPage;
    return {
      from: (page * rowsPerPage) + 1,
      to: to >= count ? count : to,
    };
  },[page, rowsPerPage, count]);

  const onPageChange = React.useCallback((value: number) => {
    const newpage = page + value;
    if(newpage <= 0){
      props.onPageChange(0);
    }else{
      props.onPageChange(newpage);
    }
  },[page]);

  return (
    <View style={styles.container}>
      <View style={{flexDirection: "row", alignItems: "center"}}>
        <Text style={styles.t_rows}>Rows per page:</Text>
        <View style={styles.divider1} />
        <RowsPerPage 
          options={props.rowsPerPageOptions} 
          value={String(rowsPerPage)}
          onSelected={props.onRowsPerPageChange} 
        />
      </View>
      <View style={styles.divider2} />
      <View style={{flexDirection: "row", alignItems: "center"}}>
        <Text style={styles.t_rows}>{value.from}-{value.to} of {count}</Text>
        <View style={styles.divider3} />
        <Pressable disabled={page === 0} onPress={() => onPageChange(-1)} style={styles.btn_arrow}>
          <Icon name="arrow-back-ios" size={15} color={page === 0 ? colors.border2 : colors.black3} />
        </Pressable>
        <View style={styles.divider4} />
        <Pressable disabled={value.to >= count} onPress={() => onPageChange(1)} style={styles.btn_arrow}>
          <Icon name="arrow-forward-ios" size={15} color={value.to >= count ? colors.border2 :  colors.black3} />
        </Pressable>
      </View>
    </View>


  // <TablePagination
  //   page={props.page}
  //   component="div"
  //   sx={{fontSize: 14, lineHeight: 16, color: colors.grayPrimary, maxHeight: 94, backgroundColor: "red"}}
  //   // labelRowsPerPage="SS"
  //   // classes="labelRowsPerPage"
  //   classes={"displayedRows"}
  //   count={props.count}
  //   rowsPerPage={props.rowsPerPage}
  //   onPageChange={props.onPageChange}
  //   rowsPerPageOptions={props.rowsPerPageOptions}
  //   onRowsPerPageChange={props.onRowsPerPageChange}
  // />
  );
};

export default Pagination;