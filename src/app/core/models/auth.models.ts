export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: AuthUser;
}

export interface ApiValidationError {
  msg: string;
  path: string;
}
