// # COMP 4521  #  Wong Lok Tai  20434788   ltwongaa@connect.ust.hk

import React from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import ImagePickerList from "./ImagePickerList";

function ImagePicker({ name, containerStyle }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const imageUris = values[name];

  const handleAdd = (uri) => {
    setFieldValue(name, [uri]);
  };

  const handleRemove = (uri) => {
    setFieldValue(
      name,
      imageUris.filter((imageUri) => imageUri !== uri)
    );
  };

  return (
    <>
      <ImagePickerList
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
        containerStyle={containerStyle}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default ImagePicker;
