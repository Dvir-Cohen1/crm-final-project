import * as Yup from "yup";

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Field Requierd"),
  password: Yup.string()
    .min(6, "Password must containe minimum 6 characters")
    .max(36,"Password cannot containe more than 36 characters")
    .required("Field Requierd Field Requierd"),
});

export default loginValidationSchema;
