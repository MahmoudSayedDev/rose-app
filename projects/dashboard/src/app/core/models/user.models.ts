export interface UserProfile {
  id: string;
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  gender: 'MALE' | 'FEMALE';
  photo: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetProfileResponse {
  status: boolean;
  code: number;
  payload: { user: UserProfile };
}

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  photo?: string;
  phone: string;
}

export interface UpdateProfileResponse {
  payload: { user: UserProfile };
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
