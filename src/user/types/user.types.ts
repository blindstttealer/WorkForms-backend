export interface UserPublic {
  id: string;
  email: string;
  login: string;
}

export interface ProfileSettings {
  name: string;
  jobTitle: string;
  experience: string;
  location: string;
  skills: string[];
  bio: string;
  photo: string;
}

export interface JobPreferences {
  jobType: string[];
  workLocation: string;
  salaryMin: string;
  salaryMax: string;
  industries: string[];
  willingToRelocate: boolean;
}

export interface NotificationAlerts {
  jobMatches: boolean;
  applicationUpdates: boolean;
  interviewReminders: boolean;
  careerInsights: boolean;
}

export interface NotificationsSettings {
  alerts: NotificationAlerts;
  notificationStyle: string;
}

export interface PrivacySettings {
  showSalaryExpectations: boolean;
  showContactInfo: boolean;
  allowRecruiterMessages: boolean;
}

export interface AccountSettings {
  email: string;
  language: string;
}

export interface UserSettings {
  profile: ProfileSettings;
  jobPreferences: JobPreferences;
  notifications: NotificationsSettings;
  privacy: PrivacySettings;
  account: AccountSettings;
}

export interface UserProfileResponse {
  user: UserPublic;
  settings: UserSettings;
}
