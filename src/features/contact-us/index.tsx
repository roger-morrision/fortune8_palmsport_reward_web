/* eslint-disable react-hooks/exhaustive-deps */
import ActivityIndicator from "@/src/common/components/ActivityIndicator";
import Button from "@/src/common/components/Button";
import Text from "@/src/common/components/Text";
import TextInput from "@/src/common/components/TextInput";
import View from "@/src/common/components/View";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import { SEND_MESSAGE } from "@/src/common/utils/states-holder";
import { useInputHelper } from "@/src/common/utils/useInputHelper";
import { useRootContext } from "@/src/context/RootContext";
import { selectAuthLoggedIn } from "@/src/store/slices/auth.slice";
import {
  selectedUserEmail,
  selectedUserName,
  selectedUserUserID,
} from "@/src/store/slices/user.slice";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import validator from "validator";
import Footer from "../homepage/footer";
import { ids, styles } from "./styles.css";
import Info from "./info";
import { useMutationApi } from "@/src/common/hooks/useMutationApi";
import { RedeemService } from "@/src/api/services/redeem.service";

function ContactUsPage() {
  const fullName = useAppSelector(selectedUserName);
  const email = useAppSelector(selectedUserEmail);
  const userId = useAppSelector(selectedUserUserID);
  const isLoggedIn = useAppSelector(selectAuthLoggedIn);
  const { state, onDispatch } = useInputHelper(SEND_MESSAGE);
  const { setSuccessMessage, setErrorMessage } = useRootContext();
  const [error, setError] = useState<typeof SEND_MESSAGE>({} as typeof SEND_MESSAGE);

  const { mutate, isPending } = useMutationApi(RedeemService.feedback, {
    onSuccess: () => {
      onDispatch("message")("");
      setSuccessMessage("Message successfully sent.");
    },
    onError: (error) => {
      setErrorMessage(error?.message ?? "Something went wrong.");
    },
  });

  const handleSubmit = () => {
    const newErr = {} as typeof SEND_MESSAGE;
    if (!state.fullName) {
      newErr.fullName = "Required";
    }
    if (!state.email) {
      newErr.email = "Required";
    }
    if (!validator.isEmail((state?.email ?? "")?.trim())) {
      newErr.email = "Invalid email format.";
    }
    if (!state.message) {
      newErr.message = "Required";
    }

    setError(newErr);

    if (_.isEmpty(newErr)) {
      mutate({ ...state, userId });
    }
  };

  useEffect(() => {
    if (!_.isEmpty(error)) {
      setError({} as typeof SEND_MESSAGE);
    }
  }, [state]);

  useEffect(() => {
    if (email !== state.email) {
      onDispatch("fullName")(fullName);
      onDispatch("email")(email);
    }
  }, [email]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={styles.container}
        dataSet={{ media: ids.container }}
        backgroundColor="background"
      >
        <View style={styles.container_flex} dataSet={{ media: ids.container_flex }}>
          <View style={styles.v_message_container} dataSet={{ media: ids.v_message_container }}>
            <Info />
            <View>
              <TextInput
                value={state.fullName}
                placeholder="Name"
                backgroundColor="secondary"
                style={[styles.input_style, error.fullName && styles.input_error]}
                onChangeText={onDispatch("fullName")}
              />
              {error.fullName && (
                <Text
                  color="error"
                  style={styles.t_error_style}
                  dataSet={{ media: ids.t_error_style }}
                >
                  {error.fullName}
                </Text>
              )}
            </View>
            <View>
              <TextInput
                value={state.email}
                disabled={isLoggedIn}
                style={[styles.input_style, error.email && styles.input_error]}
                backgroundColor="secondary"
                placeholder="Your Email Address"
                onChangeText={onDispatch("email")}
              />
              {error.email && (
                <Text
                  color="error"
                  style={styles.t_error_style}
                  dataSet={{ media: ids.t_error_style }}
                >
                  {error.email}
                </Text>
              )}
            </View>
            <TextInput
              multiline
              maxLength={999}
              value={state.message}
              backgroundColor="secondary"
              placeholder="Your Message..."
              style={[styles.input_message_style, error.message && styles.input_error]}
              onChangeText={onDispatch("message")}
            />
            <Button
              disabled={isPending}
              onPress={handleSubmit}
              backgroundColor="button"
              style={styles.button_submit}
            >
              {isPending ? (
                <ActivityIndicator animating size={"small"} color="textDark" />
              ) : (
                <Text color="textDark" fontFamily="Montserrat-SemiBold" style={styles.button_label}>
                  Submit
                </Text>
              )}
            </Button>
          </View>

          <View style={styles.footer} dataSet={{ media: ids.footer }}>
            <Footer />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default ContactUsPage;
