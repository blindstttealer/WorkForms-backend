import { UserPublic, UserSettings } from '../types/user.types';
type UserBase = Pick<{
    id: string;
    email: string;
    login: string;
}, 'id' | 'email' | 'login'>;
type SettingsRaw = {
    displayName: string | null;
    avatarUrl: string | null;
    phone: string | null;
    bio: string | null;
} | null;
export declare function toUserPublic(user: UserBase): UserPublic;
export declare function toUserSettings(settings: SettingsRaw): UserSettings;
export {};
