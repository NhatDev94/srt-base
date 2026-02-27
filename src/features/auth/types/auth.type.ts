export interface User {
    id: string;
    fullName: string;
    email: string;
    role: 'admin' | 'staff';
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}