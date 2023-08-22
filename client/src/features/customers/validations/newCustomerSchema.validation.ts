import * as yup from "yup";

const NewCustomerSchema = yup.object().shape({
  companyName: yup.string().required("Company Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  alternativeEmail: yup.string().email("Invalid email format"),
  phone: yup
    .string()
    .matches(/^\d+$/, "Phone must contain only digits")
    .min(10, "Phone must be at least 10 characters")
    .required("Phone is required"),
  address: yup.string().required("Address is required"),
  privatelyHeldCompany: yup.number(),
  contactPerson: yup.string().required("Contact Person Full Name is required"),
  contactPhone: yup
    .string()
    .matches(/^\d+$/, "Contact Person Phone must contain only digits")
    .min(10, "Contact Person Phone must be at least 10 characters")
    .required("Contact Person Phone is required"),
  website: yup.string().url("Invalid URL format"),
  companyLogo: yup.string(),
  industry: yup.string(),
  companySize: yup.string(),
  notes: yup.string(),
});

export default NewCustomerSchema;
