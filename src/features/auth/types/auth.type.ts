export type User = {
    id: string;
    fullName: string;
    email: string;
    role: 'admin' | 'staff';
}

export type LoginRequest = {
    email: string;
    password: string;
}

export type LoginResponse = {
    accessToken: string;
    refreshToken: string;
    user: User;
}