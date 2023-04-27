export interface RegisterUser {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
