// # COMP 4521  #  Wong Lok Tai  20434788   ltwongaa@connect.ust.hk

import { useFormikContext } from "formik";
import { StyleSheet } from "react-native";
import React from "react";

import ErrorMessage from "./ErrorMessage";
import InputBox from "./InputBox";

function AppFormField({ name, defaultValue, ...otherprops }) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();
  return (
    <>
      <InputBox
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        defaultValue={defaultValue}
        {...otherprops}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({});

export default AppFormField;
