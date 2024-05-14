import { combineReducers } from "redux";
import authReducer from "../features/authentication/redux/authenticationSlice";
import userReducer from "../features/users/redux/userSlice";
import taskReducer from "../features/tasks/redux/taskSlice";
import customerSlice from "../features/customers/redux/customerSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  task: taskReducer,
  customer: customerSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
