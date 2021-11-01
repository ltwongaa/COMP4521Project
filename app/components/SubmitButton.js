// # COMP 4521  #  Wong Lok Tai  20434788   ltwongaa@connect.ust.hk

import { useFormikContext } from "formik";
import React from "react";

import AppButton from "./AppButton";

function SubmitButton({ title, style, color }) {
  const { handleSubmit } = useFormikContext();

  return (
    <AppButton
      title={title}
      style={style}
      color={color}
      onPress={handleSubmit}
    />
  );
}

export default SubmitButton;
