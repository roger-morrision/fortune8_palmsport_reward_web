import DatePicker from "@/src/common/components/date-picker";
import Select from "@/src/common/components/select";
import Text from "@/src/common/components/Text";
import TextInput from "@/src/common/components/TextInput";
import View from "@/src/common/components/View";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import { getDateMinus21Years } from "@/src/common/utils/validation-helper";
import { selectedUserCoins } from "@/src/store/slices/user.slice";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import _ from "lodash";
import { DateType } from "react-native-ui-datepicker";
import { ids, styles } from "./styles.css";
import numeral from "numeral";
import { Image } from "react-native";
import { useAssetContext } from "@/src/context/AssetContext";
import { useTranslation } from "react-i18next";

dayjs.extend(customParseFormat);
export type Props = { handleClose: () => void };

function PalmsGold() {
  const { t } = useTranslation();
  const { images } = useAssetContext();
  const balance = useAppSelector(selectedUserCoins);

  return (
    <View style={styles.container} dataSet={{ media: ids.container }}>
      <View style={[styles.row_container, { justifyContent: "space-between" }]}>
        <View>
          <Text color="text" style={styles.text_title} dataSet={{ media: ids.text_title }}>
            {t("account.palms-gold")}
          </Text>
          <Text style={styles.text_description} dataSet={{ media: ids.text_description }}>
            {t("account.palms-desc")}
          </Text>
        </View>
      </View>
      <View style={styles.divider_container} />
        <View style={{flexDirection: "row", alignItems: "center", gap: 23}}>
          <Image
            style={styles.i_gold}
            dataSet={{ media: ids.i_gold }}
            source={{ uri: images?.["gold"].uri }}
            resizeMode="contain"
          />

          <View borderColor="borderColor" style={styles.v_sweeps_balance}>
            <Text fontFamily="Montserrat-Bold" style={styles.t_redemption}>
              {numeral(balance.GOLD).format("0,000.00")}
            </Text>
          </View>
        </View>
    </View>
  );
}

type ItemProps = {
  label: string;
  value: any;
  error: string;
  disabled: boolean;
  onChangeText: (value: string) => void;
};

const Item = ({ label, value, error, disabled, onChangeText }: ItemProps) => {
  return (
    <View style={styles.row_container}>
      <Text style={styles.text_label} dataSet={{ media: ids.text_label }}>
        {label}
      </Text>
      {disabled ? (
        <Text style={styles.text_value} dataSet={{ media: ids.text_value }}>
          {value}
        </Text>
      ) : (
        <TextInput
          style={styles.input_style}
          backgroundColor="secondary"
          borderColor={error ? "error" : "error"}
          placeholder=""
          value={value}
          onChangeText={onChangeText}
        />
      )}
    </View>
  );
};

const DateOfBirth = ({ label, value, error, disabled, onChangeText }: ItemProps) => {
  return (
    <View style={styles.row_container}>
      <Text style={styles.text_label} dataSet={{ media: ids.text_label }}>
        {label}
      </Text>
      {disabled ? (
        <Text style={styles.text_value} dataSet={{ media: ids.text_value }}>
          {value}
        </Text>
      ) : (
        <View style={styles.text_value}>
          <DatePicker
            format={"YYYY-MM-DD"}
            placeholder="YYYY-MM-DD"
            maxDate={getDateMinus21Years()}
            value={value as DateType}
            borderColor={error ? "error" : "error"}
            onSelected={({ date }) => {
              if (date) {
                const formatted = dayjs(date).format("YYYY-MM-DD");
                onChangeText(formatted);
              }
            }}
            inputStyle={[{ paddingLeft: "4%" }]}
          />
        </View>
      )}
    </View>
  );
};

type CountryProps = {
  idTag: number;
  options: any[];
  keys: string;
  selectedKey: string;
  labelKey: any;
  onSelectedKeys: any;
} & ItemProps;

const Dropdown = ({
  idTag,
  label,
  value,
  error,
  options,
  labelKey,
  keys,
  disabled,
  onChangeText,
  selectedKey,
  onSelectedKeys,
}: CountryProps) => {
  const nValue = typeof value === "object" ? value?.name : value;

  return (
    <View style={[styles.row_container, { zIndex: idTag }]}>
      <Text style={styles.text_label} dataSet={{ media: ids.text_label }}>
        {label}
      </Text>
      {disabled ? (
        <Text style={styles.text_value} dataSet={{ media: ids.text_value }}>
          {nValue}
        </Text>
      ) : (
        <View style={styles.text_value}>
          <Select
            ids={idTag}
            keys={keys}
            selectedKey={selectedKey}
            options={options}
            value={value}
            labelKey={labelKey}
            inputStyle={[error && styles.input_error_style]}
            onSelected={onChangeText}
            onSelectedKeys={onSelectedKeys}
          />
        </View>
      )}
    </View>
  );
};

export default PalmsGold;
