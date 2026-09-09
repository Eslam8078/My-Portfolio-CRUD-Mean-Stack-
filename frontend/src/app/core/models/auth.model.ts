export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "admin";
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}
