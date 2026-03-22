"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserPublic = toUserPublic;
function toUserPublic(user) {
    return {
        id: user.id,
        email: user.email,
        login: user.login,
    };
}
//# sourceMappingURL=user.mapper.js.map