export interface Profile {
  id: string;
  full_name: string;
  email: string;
  role: string;
  profile_picture_url: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}
