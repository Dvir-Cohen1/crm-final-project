import { combineReducers } from "redux";
import authReducer from "../features/authentication/redux/authenticationSlice";
import userReducer from "../features/users/redux/userSlice";
import taskReducer from "../features/tasks/redux/taskSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  task: taskReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
