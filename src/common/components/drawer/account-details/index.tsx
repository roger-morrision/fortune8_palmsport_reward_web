import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import SVGIcon from "@/src/constants/SVGIcon";
import { selectedTierID, selectedUserCoins, selectedUserName } from "@/src/store/slices/user.slice";
import numeral from "numeral";
import React, { useMemo } from "react";
import { ids, styles } from "./styles.css";
import Colors from "@/src/constants/Colors";

export type Props = { handleClose: () => void };

function AccountDetails() {
  const name = useAppSelector(selectedUserName);
  const tierId = useAppSelector(selectedTierID);
  const { GOLD } = useAppSelector(selectedUserCoins);

  const BadgeColor = useMemo(() => {
    switch (tierId) {
      case 1:
      default:
        return Colors.dark.copper;
      case 2:
        return Colors.dark.bronze;
      case 3:
        return Colors.dark.silver;
      case 4:
        return Colors.dark.gold;
    }
  }, [tierId]);

  return (
    <View style={styles.container} backgroundColor="secondary" dataSet={{ media: ids.container }}>
      <View>
        <SVGIcon name="account-badge" fill={BadgeColor} />
      </View>
      <View>
        <Text style={styles.text_name_style}>{name}</Text>
        <Text style={styles.text_sweep_label_style}>Sweeps Coins:</Text>
        <Text style={styles.text_balance_style}>{numeral(GOLD).format("0,000.00")}</Text>
      </View>
    </View>
  );
}

export default AccountDetails;
