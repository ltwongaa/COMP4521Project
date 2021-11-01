// # COMP 4521  #  Wong Lok Tai  20434788   ltwongaa@connect.ust.hk

import React from "react";
import { Formik } from "formik";

function FormikForm({ initialValues, onSubmit, children, validationSchema }) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
}

export default FormikForm;
