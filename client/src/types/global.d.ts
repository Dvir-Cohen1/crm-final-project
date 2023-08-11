import type { MenuProps } from "antd";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
export type MenuItem = Required<MenuProps>["items"][number];

// Redux asyncThunk
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;
export interface AppState {
  // Properties related to the App state...
}

export interface RootState {
  app: AppState;
  auth: AuthState;
  user: UserState;
  task: TaskState;
  customer: CustomerState;
  // showMessage?: Function
  // Other slices of your Redux state...
}
// Auth

export interface AuthState {
  isAuthenticated: boolean | null;
  token?: string | null;
  isLoading: boolean;
  isRegister: boolean;
  isError: boolean | null;
  error: any;
  user?: {
    _id: string;
    firstName: string;
    lastName: string;
    phoneNumber?: Number | undefined | string;
    email: string;
    pinned_items?: [];
    role: string;
  } | null;
}
export interface UserState {
  isLoading: boolean;
  isError: boolean | null;
  error: any;
  users?: [];
  user?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: Number | undefined | string;
    imgSRC?: string;
    pinned_items?: [];
    role: string;
  } | null;
}

export type FormRegisterInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type AddUserRegisterInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: Number | undefined | string;
  role: string;
};

export type FormLoginInputs = {
  email: string;
  password: string;
};

export type LayoutProps = {
  children?: ReactNode;
  isAuthenticated?: any;
  // getServerSideProps: any;
};

interface IUser {
  imgSRC: ReactNode;
  _id: Key | null | undefined;
  firstName: string;
  lastName: string;
  phoneNumber?: Number | undefined | string;
  email: string;
  role: string;
  pinned_items?: [];
}

export type UserPinnedItems = {
  _id: string;
  title: string;
  description: string;
};

// Tasks
interface ITasks {
  id: number;
  slug: string;
  title: string;
  description?: string;
  due_date?: string;
  priority?: string;
  assignee?: [string];
  followers?: [string];
  created_by: string;
}

export interface ITaskState {
  isLoading: boolean;
  isError: boolean | null;
  error: any;
  tasks?: [] | any;
  task?: any;
  assignee?: [string];
  taskStatuses?: [];
  // {
  //   _id: string;
  //   title: string;
  //   priority: string;
  //   due_date: string;
  //   followers?: [] | null;
  // } | null | {};
}

export type AddTaskRegisterInputs = {
  title: string;
  type: string;
  description?: string;
  priority: string;
  assignee?: [];
  followers?: [];
  due_date?: string;
  attachments?: [];
};

export interface TaskState {
  task: {};
  tasks: [];
  isLoading: boolean;
  isRegister: boolean;
  isError: boolean | null;
  error: any;
  task?: any;
  // {
  //   _id: string;
  //   title: string;
  //   priority: string;
  //   due_date: string;
  //   assignee?: [] | null;
  //   followers?: [] | null;
  // } | null | {};
}

export interface ITaskDataType {
  _id: string;
  key: string;
  title: string;
  description: string;
  firstName: string;
  record: any;
  priority: string;
  due_date: string;
  status: {
    _id: string;
    label: string;
    color: string;
  };
  created_by: {
    _id: string;
    firstName: string;
    imgSRC: string;
  };
  assignee: [
    {
      firstName: string;
      imgSRC: string;
    }
  ];
  followers: [
    {
      firstName: string;
      imgSRC: string;
    }
  ];
}

// task attachments
export interface FileUploadHook {
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteAll: () => Promise<void>;
  handleDeleteOne: (fileName: string) => Promise<void>;
  handleImageDownload: (imageUrl: string, imageName: string) => Promise<void>;
}

/*
 ** Customers
 */
export interface CustomerState {
  isLoading: boolean;
  isError: boolean | null;
  error: string;
  customer: {} | undefined;
  customers: any;
}

// Define the interface for the Customer schema
export interface ICustomer extends mongoose.Document {
  // Basic Information
  _id: string;
  name: string;
  email: string;
  alternativeEmail?: string;
  phone?: string;
  address?: string;
  privatelyHeldCompany?: number;

  // Additional Contact Information
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;

  // Company Details
  companyName?: string;
  companyWebsite?: string;
  companyLogo?: string;

  // Industry and Business Information
  industry?: string;
  companySize?: string;

  // Custom Fields
  // Add any additional custom fields here as needed

  // References to related entities
  users: mongoose.Schema.Types.ObjectId[];
  tasks: mongoose.Schema.Types.ObjectId[];
  projects: mongoose.Schema.Types.ObjectId[];

  // Linked Customers (for Relationships)
  linkedCustomers: mongoose.Schema.Types.ObjectId[];

  // Notes or Comments
  notes?: string;

  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;

  // Additional Fields
  active?: boolean;
}



export interface SorterResultDataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

export type CustomerColumn = {
  title: string;
  dataIndex: string;
  key: string;
  filters: { text: any; value: any }[];
  filteredValue: FilterValue | null;
  onFilter: (value: any, record: any) => boolean;
  sortOrder: SortOrder | undefined;
  ellipsis: boolean;
};