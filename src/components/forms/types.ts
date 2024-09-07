export interface LoginInterface {
  email: string;
  password: string;
}

export interface RegInterface extends LoginInterface {
  username: string;
}
