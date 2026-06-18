import { useCallback, useState } from "react";
import _ from "lodash";
import moment from "moment";

export const useValidation = () => {
  const [error, setError] = useState<any>({});

  const checkValidation = useCallback((requiredFields: any, stateInput: any) => {
    const newError: any = {};
    const ArrayConvert = _.isArray(requiredFields) ? requiredFields : Object.keys(requiredFields);
    ArrayConvert.forEach((field: any) => {
      if (!stateInput[field]) {
        newError[field] = "This field is required";
      }
    });

    if (!_.isEmpty(newError)) {
      setError(newError);
    }

    return newError;
  }, []);

  const onSetError = useCallback(
    (newError: any) => {
      setError(newError);
    },
    [error],
  );

  return { errorInput: error, checkValidation, onSetError };
};

export function getDateMinus21Years() {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 21);

  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const dd = String(today.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`; // format: YYYY-MM-DD
}

// CALCULATE TIME BASE ON END DATE
export const calculateTimeLeft = (endDate: string) => {
  const now = moment();
  const end = moment.parseZone(endDate);
  const difference = end.diff(now);
  const duration = moment.duration(difference);

  return {
    days: duration.days(),
    hours: duration.hours(),
    minutes: duration.minutes(),
  };
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
