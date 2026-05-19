export interface LoginRequest {
  email?: string;
  phone?: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  emailOtp: string;
  phoneOtp: string;
}

export interface SendRegistrationOtpRequest {
  email: string;
  phone?: string;
}

export interface SendRegistrationOtpResponse {
  success: boolean;
  message: string;
  phoneSent: boolean;
}

export interface SendLoginOtpRequest {
  email?: string;
  phone?: string;
}

export interface SendLoginOtpResponse {
  success: boolean;
  message: string;
}

export interface VerifyLoginOtpRequest {
  email?: string;
  phone?: string;
  otp: string;
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

export interface MessageResponse {
  success: boolean;
  message: string;
}

export interface ApiValidationError {
  msg: string;
  path: string;
}
