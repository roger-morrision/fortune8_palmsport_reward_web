import StyleSheet from 'react-native-media-query';

const { ids, styles } = StyleSheet.create(
  {
    container: {
      width: "100%",
      height: "100%",
      minHeight: 600,
    },
    linear_container: {
      bottom: 0,
      width: "100%",
      height: "60%",
      position: "absolute",
      "@media (max-width: 800px)": {
        height: "54%",
      },
    },
    bodyStyle: {
      width: "100%",
      height: "100%",
      position: "absolute",
      zIndex: 1,
    },
    i_background: {
      width: "100%",
      height: "100%",
      position: "absolute",
      "@media (max-width: 800px)": {
        minWidth: 900,
        top: "-20%",
        alignSelf: "center",
        width: "100%",
        height: "100%",
      },
    },

    center_container: {
      top: 0,
      position: "absolute",
      width: "100%",
      height: "60%",
      alignItems: "center",
    },
    i_logo: {
      marginTop: "2%",
      width: "16%",
      height: "43%",
    },
    t_play_now: {
      width: "36%",
      height: "22%",
    },
    t_play_now_bg: {
      width: "50%",
      height: "22%",
    },
    t_for_free: {
      marginTop: "0.5%",
      width: "24%",
      height: "14%",
    },
    i_elements: {
      width: "23%",
      left: "1%",
      bottom: "3.6%",
      height: "50%",
      position: "absolute",
      "@media (max-width: 800px)": {
        position: "absolute",
        top: "24%",
        left: "28%",
        right: null,
        bottom: null,
        width: "50%",
        height: "32%",
      },
    },
    i_referee: {
      bottom: "5%",
      width: "13%",
      height: "75%",
      right: "2.6%",
      position: "absolute",
      display: "flex",
      "@media (max-width: 800px)": {
        display: "none",
      },
    },
  },
);

export { ids, styles };
