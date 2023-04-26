import * as Yup from "yup";

const newUserSchemaValidation = Yup.object().shape({
  firstName: Yup.string().required(" Field Requierd ").min(5).max(30),
  lastName: Yup.string().required("Field Requierd  ").min(5).max(30),
  email: Yup.string().email("Invalid email").required("Field Requierd Feld "),
  password: Yup.string()
    .min(6, "Password must containe minimum 6 characters")
    .max(36, "Password cannot containe more than 36 characters")
    .required("Field Requierd Field Requierd"),
  phoneNumber: Yup.number().min(5),
  role: Yup.mixed<any>().oneOf(Object.values(["Admin", "Member"])),
});

export default newUserSchemaValidation;
