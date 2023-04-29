export interface IUser extends Document {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber?: Number;
  role?: string[];
  imgSRC?: string;
  jwt_ac_token?: Secret;
  jwt_rf_token?: Secret;
  comparePassword: Function;
  setJwtTokens: Function;
  deleteAcToken: Function;
  isModified: Function;
}
