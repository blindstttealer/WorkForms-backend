import { UserPublic, UserSettings } from '../types/user.types';

type UserBase = Pick<{ id: string; email: string; login: string }, 'id' | 'email' | 'login'>;
type SettingsRaw = {
  displayName: string | null;
  avatarUrl: string | null;
  phone: string | null;
  bio: string | null;
} | null;

export function toUserPublic(user: UserBase): UserPublic {
  return {
    id: user.id,
    email: user.email,
    login: user.login,
  };
}

export function toUserSettings(settings: SettingsRaw): UserSettings {
  return {
    displayName: settings?.displayName ?? null,
    avatarUrl: settings?.avatarUrl ?? null,
    phone: settings?.phone ?? null,
    bio: settings?.bio ?? null,
  };
}
