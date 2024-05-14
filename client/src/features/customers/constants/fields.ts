export const EXCLUDED_CUSTOMER_FIELDS = [
  "__v",
  "linkedCustomers",
  "projects",
  "tasks",
  "users",
  "active",
];

export const NEW_CUSTOMERS_FIELDS = [
  {
    name: "companyName",
    placeholder: "Company Name",
    required: true,
    defaultValue: "",
    allowClear: false,
    addonBefore: "",
  },
  {
    name: "email",
    placeholder: "Email",
    required: true,
    defaultValue: "",
    allowClear: false,
    addonBefore: "",
  },
  {
    name: "alternativeEmail",
    placeholder: "Alternative Email",
    required: true,
    defaultValue: "",
    allowClear: false,
    addonBefore: "",
  },
  {
    name: "phone",
    placeholder: "Phone",
    required: true,
    defaultValue: "",
    allowClear: false,
    addonBefore: "",
  },
  {
    name: "address",
    placeholder: "Address",
    required: true,
    defaultValue: "",
    allowClear: false,
    addonBefore: "",
  },
  {
    name: "privatelyHeldCompany",
    placeholder: "Privately Held Company",
    required: false,
    defaultValue: "",
    allowClear: false,
    addonBefore: "",
  },
  {
    name: "contactPerson",
    placeholder: "Contact Person Full Name",
    required: true,
    defaultValue: "",
    allowClear: false,
    addonBefore: "",
  },
  {
    name: "contactPhone",
    placeholder: "Contact Person Phone",
    required: true,
    defaultValue: "",
    allowClear: false,
    addonBefore: "",
  },
  {
    name: "companyWebsite",
    placeholder: "Company Website",
    required: false,
    defaultValue: "mysite",
    allowClear: false,
    addonBefore: "https://",
  },
  {
    name: "companyLogo",
    placeholder: "Company Logo",
    required: false,
    defaultValue: "",
    allowClear: false,
    addonBefore: "",
  },
  {
    name: "industry",
    placeholder: "Industry",
    required: false,
    defaultValue: "",
    allowClear: false,
    addonBefore: "",
  },
  {
    name: "companySize",
    placeholder: "Company Size",
    required: false,
    defaultValue: "",
    allowClear: false,
    addonBefore: "",
  },
  {
    name: "notes",
    placeholder: "Notes",
    required: false,
    defaultValue: "",
    allowClear: false,
    addonBefore: "",
  },
];