import ActivityIndicator from "@/src/common/components/ActivityIndicator";
import Button from "@/src/common/components/Button";
import InputLabel from "@/src/common/components/InputLabel";
import Select from "@/src/common/components/select";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import { IDTypes } from "@/src/common/utils/options-holder";
import { SIGNUP_STATES } from "@/src/common/utils/states-holder";
import { selectedSigningIn } from "@/src/store/slices/signup.slice";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { ids, styles } from "./styles.css";
import Identification from "./identification";
import { useLobbyService } from "@/src/store/hooks";
import { selectKYCInputs } from "@/src/store/slices/lobby.slice";

function ProofOfIdentity() {
  const input = useAppSelector(selectKYCInputs);
  const { onKYCInputUpdate } = useLobbyService();
  const isLoading = useAppSelector(selectedSigningIn);
  const [error, setError] = useState<typeof SIGNUP_STATES>({} as typeof SIGNUP_STATES);

  const onSubmit = () => {
    const newErr: any = {};

    if (!input.type) {
      newErr.type = "Required";
    }

    if (!input.idNumber) {
      newErr.idNumber = "Required";
    }

    if (!input.frontImage) {
      newErr.frontImage = "Required";
    }

    if (!input.backImage) {
      newErr.backImage = "Required";
    }

    console.log("newErr", newErr);

    setError(newErr);

    if (_.isEmpty(newErr)) {
      onKYCInputUpdate("currentScreen")(2);
    }
  };

  useEffect(() => {
    if (!_.isEmpty(error)) {
      setError({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  return (
    <View style={styles.input_container} dataSet={{ media: ids.input_container }}>
      <Text
        color="yellowThick"
        fontFamily="Montserrat-Bold"
        style={styles.title_style}
        dataSet={{ media: ids.title_style }}
      >
        Upload proof of your identity
      </Text>
      <View style={{ zIndex: 2, marginTop: 21 }}>
        <Text style={[styles.label_style, error.type && { color: "red" }]}>
          Please select an ID type below <Text color="red">*</Text>
        </Text>
        <Select
          ids={2}
          keys={"type"}
          labelKey="label"
          options={IDTypes}
          value={input?.type}
          selectedKey={input.dropdownKey}
          placeholder="Select ID Type"
          style={{ marginTop: 15 }}
          inputStyle={[error.type && styles.input_error_style]}
          onSelected={onKYCInputUpdate("type")}
          onSelectedKeys={onKYCInputUpdate("dropdownKey")}
        />
        {error.type && (
          <Text
            style={styles.text_error_bottom_style}
            dataSet={{ media: ids.text_error_bottom_style }}
            fontFamily="Montserrat-Light"
          >
            {error.type}
          </Text>
        )}
      </View>
      <InputLabel
        isRequired
        labelColor="text"
        style={{ marginTop: 15 }}
        label="ID Number"
        errorPosition="bottom"
        placeholder="Eg. 829149237461"
        labelFontFamily="Montserrat"
        labelStyle={styles.label_style}
        inputStyle={styles.input_style}
        value={input.idNumber}
        error={error.idNumber}
        onChangeText={onKYCInputUpdate("idNumber")}
        inputDataSet={{ media: ids.input_style }}
      />
      <Identification
        label="Upload front of ID"
        title={"ID capture (front)"}
        value={input?.frontImage}
        error={error.frontImage}
        onChange={onKYCInputUpdate("frontImage")}
      />
      <Identification
        label="Upload back of ID"
        title={"ID capture (back)"}
        value={input?.backImage}
        error={error.backImage}
        onChange={onKYCInputUpdate("backImage")}
      />
      <View style={{ gap: 20, marginTop: 50 }}>
        <Button
          onPress={onSubmit}
          disabled={isLoading}
          backgroundColor={"button"}
          style={styles.login_button_style}
          dataSet={{ media: ids.login_button_style }}
        >
          {isLoading ? (
            <ActivityIndicator color={"primary"} />
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
          onPress={() => onKYCInputUpdate("currentScreen")(0)}
          disabled={isLoading}
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

export default ProofOfIdentity;
