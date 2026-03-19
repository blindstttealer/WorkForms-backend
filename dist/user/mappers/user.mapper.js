"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserPublic = toUserPublic;
exports.toUserSettings = toUserSettings;
function toUserPublic(user) {
    return {
        id: user.id,
        email: user.email,
        login: user.login,
    };
}
function toUserSettings(settings) {
    return {
        displayName: settings?.displayName ?? null,
        avatarUrl: settings?.avatarUrl ?? null,
        phone: settings?.phone ?? null,
        bio: settings?.bio ?? null,
    };
}
//# sourceMappingURL=user.mapper.js.map