export interface User_Model {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface UserQuery {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
}
