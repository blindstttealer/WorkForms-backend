export interface UserPublic {
    id: string;
    email: string;
    login: string;
}
export interface UserSettings {
    displayName: string | null;
    avatarUrl: string | null;
    phone: string | null;
    bio: string | null;
}
export interface UserProfileResponse {
    user: UserPublic;
    settings: UserSettings;
}
