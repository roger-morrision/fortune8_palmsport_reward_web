/* eslint-disable react-hooks/exhaustive-deps */
import ActivityIndicator from "@/src/common/components/ActivityIndicator";
import Button from "@/src/common/components/Button";
import DatePicker from "@/src/common/components/date-picker";
import InputLabel from "@/src/common/components/InputLabel";
import Select from "@/src/common/components/select";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import { getDateMinus21Years } from "@/src/common/utils/validation-helper";
import { useRootContext } from "@/src/context/RootContext";
import { KYCValue } from "@/src/store/types";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { DateType } from "react-native-ui-datepicker";
import { ids, styles } from "./styles.css";
import { useApi } from "@/src/common/hooks/useApi";
import { LookupService } from "@/src/api/services/lookup.service";
import { KYCService } from "@/src/api/services/kyc.service";
import { selectKYCInputs } from "@/src/store/slices/lobby.slice";
import { useLobbyService } from "@/src/store/hooks";

function PersonalDetails() {
  const router = useRouter();
  const input = useAppSelector(selectKYCInputs);
  const { setErrorMessage } = useRootContext();
  const lookupApi = useApi(LookupService.provinces);
  const [error, setError] = useState<KYCValue>({} as KYCValue);
  const { onKYCInputUpdate, onClearKYCInput } = useLobbyService();

  const { loading, execute } = useApi(KYCService.validate, {
    onSuccess: () => {
      onKYCInputUpdate("currentScreen")(1);
    },
    onError: (error) => {
      setErrorMessage(error?.message ?? error?.error?.message);
    },
  });

  const onSubmit = () => {
    const newErr: any = {};

    if (!input.ssn) {
      newErr.ssn = "Required";
    }

    if (!input.firstName) {
      newErr.firstName = "Required";
    }
    if (!input.lastName) {
      newErr.lastName = "Required";
    }

    if (!input.street) {
      newErr.street = "Required";
    }

    if (!input.zipCode) {
      newErr.zipCode = "Required";
    }

    if (!input.city) {
      newErr.city = "Required";
    }

    if (!input.state) {
      newErr.state = "Required";
    }

    if (!input.phoneNumber) {
      newErr.phoneNumber = "Required";
    }
    if (!input.dateOfBirth) {
      newErr.dateOfBirth = "Required";
    }

    setError(newErr);

    if (_.isEmpty(newErr)) {
      const params = {
        city: input.city,
        dateOfBirth: input.dateOfBirth,
        firstName: input.firstName,
        lastName: input.lastName,
        middleName: input.middleName,
        phoneNumber: input.phoneNumber,
        ssn: input.ssn,
        state: (input.state as any)?.name ?? input.state,
        street: input.street,
        zipCode: input.zipCode,
      } as any;

      execute(params);
    }
  };

  const handleCancel = () => {
    onClearKYCInput();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    router.canGoBack() ? router.back() : router.replace("/");
  };

  useEffect(() => {
    lookupApi.execute();

    return () => {
      lookupApi.abort(); // optional manual cancel
    };
  }, []);

  useEffect(() => {
    if (!_.isEmpty(error)) {
      setError({} as KYCValue);
    }
  }, [input]);

  return (
    <View style={styles.input_container} dataSet={{ media: ids.input_container }}>
      <InputLabel
        style={{ marginTop: 0 }}
        inputContainer={{ marginTop: 0 }}
        errorPosition="bottom"
        placeholder="SSN *"
        inputStyle={styles.input_style}
        value={input?.ssn}
        error={error.ssn}
        onChangeText={onKYCInputUpdate("ssn")}
        inputDataSet={{ media: ids.input_style }}
      />
      <InputLabel
        style={{ marginTop: 0 }}
        inputContainer={{ marginTop: 0 }}
        errorPosition="bottom"
        placeholder="First Name *"
        inputStyle={styles.input_style}
        value={input?.firstName}
        error={error.firstName}
        onChangeText={onKYCInputUpdate("firstName")}
        inputDataSet={{ media: ids.input_style }}
      />
      <InputLabel
        style={{ marginTop: 0 }}
        inputContainer={{ marginTop: 0 }}
        errorPosition="bottom"
        placeholder="Middle Name"
        inputStyle={styles.input_style}
        value={input?.middleName}
        error={error.middleName}
        onChangeText={onKYCInputUpdate("middleName")}
        inputDataSet={{ media: ids.input_style }}
      />
      <InputLabel
        style={{ marginTop: 0 }}
        inputContainer={{ marginTop: 0 }}
        errorPosition="bottom"
        placeholder="Last Name *"
        inputStyle={styles.input_style}
        value={input?.lastName}
        error={error.lastName}
        onChangeText={onKYCInputUpdate("lastName")}
        inputDataSet={{ media: ids.input_style }}
      />
      <InputLabel
        style={{ marginTop: 0 }}
        inputContainer={{ marginTop: 0 }}
        errorPosition="bottom"
        placeholder="Street *"
        inputStyle={styles.input_style}
        value={input?.street}
        error={error.street}
        onChangeText={onKYCInputUpdate("street")}
        inputDataSet={{ media: ids.input_style }}
      />
      <InputLabel
        style={{ marginTop: 0 }}
        inputContainer={{ marginTop: 0 }}
        errorPosition="bottom"
        placeholder="Zip Code *"
        inputStyle={styles.input_style}
        value={input?.zipCode}
        error={error.zipCode}
        onChangeText={onKYCInputUpdate("zipCode")}
        inputDataSet={{ media: ids.input_style }}
      />
      <InputLabel
        style={{ marginTop: 0 }}
        inputContainer={{ marginTop: 0 }}
        errorPosition="bottom"
        placeholder="City *"
        inputStyle={styles.input_style}
        value={input?.city}
        error={error.city}
        onChangeText={onKYCInputUpdate("city")}
        inputDataSet={{ media: ids.input_style }}
      />
      <View style={{ zIndex: 2 }}>
        <Select
          ids={2}
          keys={"country"}
          selectedKey={input?.dropdownKey}
          options={(lookupApi?.data as any)?.data ?? []}
          placeholder="State *"
          value={input?.state}
          labelKey="name"
          inputStyle={[error.state && styles.input_error_style]}
          onSelected={onKYCInputUpdate("state")}
          onSelectedKeys={onKYCInputUpdate("dropdownKey")}
        />
        {error.state && (
          <Text
            style={styles.text_error_bottom_style}
            dataSet={{ media: ids.text_error_bottom_style }}
            fontFamily="Montserrat-Light"
          >
            {error.state}
          </Text>
        )}
      </View>
      <InputLabel
        style={{ marginTop: 0 }}
        inputContainer={{ marginTop: 0 }}
        errorPosition="bottom"
        placeholder="Phone *"
        inputStyle={styles.input_style}
        value={input?.phoneNumber}
        error={error.phoneNumber}
        onChangeText={onKYCInputUpdate("phoneNumber")}
        inputDataSet={{ media: ids.input_style }}
      />
      <View>
        <DatePicker
          label="Birthdate *"
          format={"YYYY-MM-DD"}
          placeholder="YYYY-MM-DD"
          borderColor="borderColor"
          maxDate={getDateMinus21Years()}
          value={input?.dateOfBirth as DateType}
          onSelected={({ date }) => {
            if (date) {
              const formatted = dayjs(date).format("YYYY-MM-DD");
              onKYCInputUpdate("dateOfBirth")(formatted);
            }
          }}
          inputStyle={[error.dateOfBirth && styles.input_error_style]}
        />
        {error.dateOfBirth && (
          <Text
            style={styles.text_error_bottom_style}
            dataSet={{ media: ids.text_error_bottom_style }}
            fontFamily="Montserrat-Light"
          >
            {error.dateOfBirth}
          </Text>
        )}
      </View>
      <View style={{ gap: 20, marginTop: 50 }}>
        <Button
          disabled={loading}
          onPress={onSubmit}
          backgroundColor={"button"}
          style={styles.login_button_style}
          dataSet={{ media: ids.login_button_style }}
        >
          {loading ? (
            <ActivityIndicator animating size={"small"} color="textDark" />
          ) : (
            <Text
              color={"primary"}
              style={styles.login_label_style}
              dataSet={{ media: ids.login_label_style }}
              fontFamily="Montserrat-Medium"
            >
              Continue
            </Text>
          )}
        </Button>
        <Button
          disabled={loading}
          onPress={handleCancel}
          backgroundColor={"transparent"}
          borderColor="button"
          style={[styles.login_button_style, { borderWidth: 1 }]}
          dataSet={{ media: ids.login_button_style }}
        >
          <Text
            style={styles.login_label_style}
            dataSet={{ media: ids.login_label_style }}
            fontFamily="Montserrat-Medium"
          >
            Cancel
          </Text>
        </Button>
      </View>
    </View>
  );
}

export default PersonalDetails;
