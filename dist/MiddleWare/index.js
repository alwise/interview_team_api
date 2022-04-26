"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamMemberMiddleware = exports.InviteMiddleware = exports.TeamMiddleware = exports.AuthMiddleware = exports.handleRequestData = void 0;
const RequestHandler_1 = __importDefault(require("./RequestHandler"));
exports.handleRequestData = RequestHandler_1.default;
const UsersModule_1 = require("../Modules/UsersModule");
Object.defineProperty(exports, "AuthMiddleware", { enumerable: true, get: function () { return UsersModule_1.AuthMiddleware; } });
const TeamsModule_1 = require("../Modules/TeamsModule");
Object.defineProperty(exports, "TeamMiddleware", { enumerable: true, get: function () { return TeamsModule_1.TeamMiddleware; } });
const InviteModule_1 = require("../Modules/InviteModule");
Object.defineProperty(exports, "InviteMiddleware", { enumerable: true, get: function () { return InviteModule_1.InviteMiddleware; } });
const TeamMembersModule_1 = require("../Modules/TeamMembersModule");
Object.defineProperty(exports, "TeamMemberMiddleware", { enumerable: true, get: function () { return TeamMembersModule_1.TeamMemberMiddleware; } });
