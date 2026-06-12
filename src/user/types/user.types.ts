import { UserSettings } from "../../settings/types/settings.types";

export interface UserPublic {
  id: string;
  email: string;
  login: string;
}

export interface UserProfileResponse {
  user: UserPublic;
  settings: UserSettings;
}
