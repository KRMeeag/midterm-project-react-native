import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  contact_number: Yup.string()
    .matches(/^[0-9]+$/, "Contact number must contain only digits")
    .required("Contact number is required"),
  wswhy: Yup.string().required("This field is required"),
});