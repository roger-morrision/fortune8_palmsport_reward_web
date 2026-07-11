import { useEffect } from "react";
import DatePicker from "@/src/common/components/date-picker";
import Select from "@/src/common/components/select";
import Text from "@/src/common/components/Text";
import TextInput from "@/src/common/components/TextInput";
import View from "@/src/common/components/View";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import { CHANGE_USER_DETAILS_STATES } from "@/src/common/utils/states-holder";
import { useInputHelper } from "@/src/common/utils/useInputHelper";
import { getDateMinus21Years } from "@/src/common/utils/validation-helper";
import { selectUserSession } from "@/src/store/slices/user.slice";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import _ from "lodash";
import { DateType } from "react-native-ui-datepicker";
import { ids, styles } from "./styles.css";
import { useTranslation } from "react-i18next";

dayjs.extend(customParseFormat);
export type Props = { handleClose: () => void };

function AccountDetails() {
  const { t } = useTranslation();
  const user = useAppSelector(selectUserSession);
  const { state, onDispatch, onSetInitial } = useInputHelper(CHANGE_USER_DETAILS_STATES);

  useEffect(() => {
    if (!_.isEmpty(user)) {
      onSetInitial({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        displayName: user.displayName,
        dateOfBirth: user.dateOfBirth
          ? dayjs(user.dateOfBirth, "DD-MM-YYYY").format("YYYY-MM-DD")
          : null,
        countryId: user?.userDetail?.province,
        genderId: user?.userDetail?.gender?.name,
      } as typeof CHANGE_USER_DETAILS_STATES);
    }
  }, [user]);

  return (
    <View style={styles.container} dataSet={{ media: ids.container }}>
      <View style={[styles.row_container, { justifyContent: "space-between" }]}>
        <View>
          <Text color="text" style={styles.text_title} dataSet={{ media: ids.text_title }}>
            {t("account.details")}
          </Text>
          <Text style={styles.text_description} dataSet={{ media: ids.text_description }}>
            {t("account.details-desc")}
          </Text>
        </View>
      </View>
      <View style={styles.divider_containera} />
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <View style={{ gap: 15, flex: 1 }}>
            <Item
              label={t("account.details-fn")}
              disabled
              error={""}
              value={state.firstName}
              onChangeText={onDispatch("firstName")}
            />
            <Item
              label={t("account.details-pn")}
              disabled
              value={state.displayName}
              error={""}
              onChangeText={onDispatch("displayName")}
            />
          </View>
          <View style={{ gap: 15, flex: 1 }}>
            <Item
              label={t("account.details-ln")}
              disabled
              value={state.lastName}
              error={""}
              onChangeText={onDispatch("lastName")}
            />
            <Item
              label={t("account.details-pid")}
              disabled
              value={state.id}
              error={""}
              onChangeText={onDispatch("id")}
            />
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

export default AccountDetails;
