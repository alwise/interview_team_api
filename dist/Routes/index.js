"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UsersModule_1 = require("../Modules/UsersModule");
const TeamsModule_1 = require("../Modules/TeamsModule");
const TeamMembersModule_1 = require("../Modules/TeamMembersModule");
const InviteModule_1 = require("../Modules/InviteModule");
const express_1 = require("express");
const file_manager_1 = __importDefault(require("../Helpers/file_manager"));
const RequestHandler_1 = require("../MiddleWare/RequestHandler");
exports.default = (0, express_1.Router)().use('/users', UsersModule_1.UserRoute)
    .use('/teams', TeamsModule_1.TeamRoute)
    .use('/invites', InviteModule_1.InviteRoute)
    .use('/team-members', TeamMembersModule_1.TeamMemberRoute)
    .use('/file', file_manager_1.default)
    .use('*', (req, res) => res.send((0, RequestHandler_1.failedResponse)({ statusCode: 400, message: 'Unauthorized user' })));
