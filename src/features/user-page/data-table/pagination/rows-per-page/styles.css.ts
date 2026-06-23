import { CreateResponsiveStyle, DEVICE_SIZES } from "rn-responsive-styles";
import colors from "@assets/colors";

const useStyles = CreateResponsiveStyle(
  {
    // MENU COMPONENTS
    modal: { flex: 1 },
    dropdown: {
      height: 241,
      borderWidth: 0.5,
      position: "absolute",
      backgroundColor: "white",
      justifyContent: "center",
      borderColor: colors.border2,
    },
    flatlist: { marginTop: 1},
    item_separator: { height: 1 },
    v_item: {
      height: 35,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    v_item_active: { backgroundColor: colors.gray4 },
    t_item: {
      // flex: 1,
      fontSize: 14,
      lineHeight: 16,
      fontFamily: "IBMPlexSans",
      color: colors.black3,
    },
  },
  {
    [DEVICE_SIZES.LG]: {
      dropdown: { height: 181 },
      t_item: { fontSize: 11, lineHeight: 12}
    },
  }
);

export default useStyles;
