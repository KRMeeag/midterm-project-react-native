import * as Yup from "yup";

const phoneRegExp = /^\+[1-9]\d{1,14}$/;

export const validationSchema = Yup.object().shape({
  name: Yup.string().min(2, "Name is too short").required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  contact_number: Yup.string()
    .matches(
      phoneRegExp,
      "Phone number must start with '+' followed by the country code (e.g., +639...)",
    )
    .required("Contact number is required"),
  wswhy: Yup.string()
    .min(20, "Please provide a more detailed response (min 20 characters)")
    .required("This field is required"),
});
