import { CreateResponsiveStyle, DEVICE_SIZES, maxSize } from "rn-responsive-styles";
import TypographyStyle from "@assets/typography";
import colors from "@assets/colors";

const useStyles = CreateResponsiveStyle(
  {
    container: {flexDirection: "row", alignItems: "center", paddingHorizontal: 40,
      justifyContent: "flex-end", width: "100%", height: 90, backgroundColor: colors.colorPrimary},
    t_rows: TypographyStyle.ButtonSRegular,
    divider1: {width: 13},
    divider2: {width: 50, backgroundColor: colors.colorPrimary},
    divider3: {width: 30},
    divider4: {width: 8},
    btn_rows: {flexDirection: "row", alignItems: "center", height: 24, minWidth: 30},
    btn_arrow: {width: 24, height: 24, alignItems: "center", justifyContent: "center"},
  },
  {
    [DEVICE_SIZES.LARGE_DEVICE]: {
      t_rows: {fontSize: 11, lineHeight: 12},
      divider1: {width: 10},
      divider3: {width: 20},
      btn_arrow: { width: 17, height: 17 }
    },
    [maxSize(DEVICE_SIZES.MD)]: {
      container: {
        paddingHorizontal: 0,
      }
    },
  }
);

export default useStyles;
