export type User = {
    id: string;
    fullName: string;
    email: string;
    role: 'admin' | 'staff';
}

export type Credentials = {
    email: string,
    password: string
}

export type LoginResponse = {
    accessToken: string;
    refreshToken: string;
    user: User;
}