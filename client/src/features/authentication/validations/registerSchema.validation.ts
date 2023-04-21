import * as Yup from "yup";

const registerValidationSchema = Yup.object().shape({
  firstName: Yup.string().required(" Field Requierd "),
  lastName: Yup.string().required("Field Requierd  "),
  email: Yup.string().email("Invalid email").required("Field Requierd Feld "),
  password: Yup.string()
    .min(6, "Password must containe minimum 6 characters")
    .max(36, "Password cannot containe more than 36 characters")
    .required("Field Requierd Field Requierd"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password must match")
    .required("Field Requierd  "),
});

export default registerValidationSchema;
