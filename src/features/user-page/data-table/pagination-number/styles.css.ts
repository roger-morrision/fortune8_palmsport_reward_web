import colors from '@assets/colors';
import { CreateResponsiveStyle, DEVICE_SIZES } from 'rn-responsive-styles';

const useStyles = CreateResponsiveStyle(
  {
    container: { 
      height: 60,
      alignItems: 'center',
      flexDirection: "row",
      alignSelf: "flex-end",
      justifyContent: "center",
    },
    titleStyle: {
      fontFamily: "IBMPlexSans",
      textAlign: "center",
      fontSize: 24,
      lineHeight: 28,
      color: colors.black3,
    },
    v_numbers: {
      width: 20, height: 20, 
      justifyContent: "center",
      alignItems: "center"
    },
    t_number: {
      fontFamily: "IBMPlexSans",
      fontSize: 15,
      lineHeight: 15,
      color: colors.border7
    },
    t_number_active: {
      fontFamily: "IBMPlexSans-Bold",
      color: colors.black3
    },
    v_actions: {
      marginLeft: 30,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    v_line_separator: {
      width: 1,
      height: 13,
      marginHorizontal: 7,
      backgroundColor: colors.black3
    },
    t_next: {
      fontFamily: "IBMPlexSans",
      fontSize: 15,
      lineHeight: 15,
      color: colors.black3
    },
    t_see_all: {
      fontFamily: "IBMPlexSans-Bold",
      fontSize: 12,
      lineHeight: 12,
      color: colors.purple4,
      textDecorationLine: "underline"
    }
  },
  {
    [DEVICE_SIZES.LG]: {
      t_see_all: {
        fontSize: 10,
        lineHeight: 10,
      }
    },
    [DEVICE_SIZES.MD]: {
    },
    [DEVICE_SIZES.SM]: {
      container: {
        paddingHorizontal: 20,
      },
      
    },
    [DEVICE_SIZES.XS]: {
      container: {
        paddingHorizontal: 20,
      },
      
    },
  }
);

export default useStyles;
