export declare class ProfileDto {
    name: string;
    jobTitle: string;
    experience: string;
    location: string;
    skills: string[];
    bio: string;
    photo: string;
}
export declare class JobPreferencesDto {
    jobType: string[];
    workLocation: string;
    salaryMin: string;
    salaryMax: string;
    industries: string[];
    willingToRelocate: boolean;
}
export declare class NotificationAlertsDto {
    jobMatches: boolean;
    applicationUpdates: boolean;
    interviewReminders: boolean;
    careerInsights: boolean;
}
export declare class NotificationsDto {
    alerts: NotificationAlertsDto;
    notificationStyle: string;
}
export declare class PrivacyDto {
    showSalaryExpectations: boolean;
    showContactInfo: boolean;
    allowRecruiterMessages: boolean;
}
export declare class AccountDto {
    email: string;
    language: string;
}
export declare class SaveSettingsDto {
    profile: ProfileDto;
    jobPreferences: JobPreferencesDto;
    notifications: NotificationsDto;
    privacy: PrivacyDto;
    account: AccountDto;
}
