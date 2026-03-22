"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveSettingsDto = exports.AccountDto = exports.PrivacyDto = exports.NotificationsDto = exports.NotificationAlertsDto = exports.JobPreferencesDto = exports.ProfileDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class ProfileDto {
}
exports.ProfileDto = ProfileDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], ProfileDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], ProfileDto.prototype, "jobTitle", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], ProfileDto.prototype, "experience", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], ProfileDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], ProfileDto.prototype, "skills", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], ProfileDto.prototype, "bio", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((_, v) => v !== "" && v != null),
    (0, class_validator_1.IsUrl)({}, { message: "Photo must be a valid URL" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProfileDto.prototype, "photo", void 0);
class JobPreferencesDto {
}
exports.JobPreferencesDto = JobPreferencesDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], JobPreferencesDto.prototype, "jobType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], JobPreferencesDto.prototype, "workLocation", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], JobPreferencesDto.prototype, "salaryMin", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], JobPreferencesDto.prototype, "salaryMax", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], JobPreferencesDto.prototype, "industries", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], JobPreferencesDto.prototype, "willingToRelocate", void 0);
class NotificationAlertsDto {
}
exports.NotificationAlertsDto = NotificationAlertsDto;
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NotificationAlertsDto.prototype, "jobMatches", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NotificationAlertsDto.prototype, "applicationUpdates", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NotificationAlertsDto.prototype, "interviewReminders", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NotificationAlertsDto.prototype, "careerInsights", void 0);
class NotificationsDto {
}
exports.NotificationsDto = NotificationsDto;
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => NotificationAlertsDto),
    __metadata("design:type", NotificationAlertsDto)
], NotificationsDto.prototype, "alerts", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(["email", "push", "both"]),
    __metadata("design:type", String)
], NotificationsDto.prototype, "notificationStyle", void 0);
class PrivacyDto {
}
exports.PrivacyDto = PrivacyDto;
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PrivacyDto.prototype, "showSalaryExpectations", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PrivacyDto.prototype, "showContactInfo", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PrivacyDto.prototype, "allowRecruiterMessages", void 0);
class AccountDto {
}
exports.AccountDto = AccountDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], AccountDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(10),
    __metadata("design:type", String)
], AccountDto.prototype, "language", void 0);
class SaveSettingsDto {
}
exports.SaveSettingsDto = SaveSettingsDto;
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ProfileDto),
    __metadata("design:type", ProfileDto)
], SaveSettingsDto.prototype, "profile", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => JobPreferencesDto),
    __metadata("design:type", JobPreferencesDto)
], SaveSettingsDto.prototype, "jobPreferences", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => NotificationsDto),
    __metadata("design:type", NotificationsDto)
], SaveSettingsDto.prototype, "notifications", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => PrivacyDto),
    __metadata("design:type", PrivacyDto)
], SaveSettingsDto.prototype, "privacy", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AccountDto),
    __metadata("design:type", AccountDto)
], SaveSettingsDto.prototype, "account", void 0);
//# sourceMappingURL=save-settings.dto.js.map