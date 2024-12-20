export interface ISignUpResponse {
  message: string;
  token: string;
  user: IUser;
}

export interface IUser {
  name: string;
  email: string;
  updated_at: string;
  created_at: string;
  id: number;
}
