"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UsersModule_1 = require("../Modules/UsersModule");
const TeamsModule_1 = require("../Modules/TeamsModule");
const TeamMembersModule_1 = require("../Modules/TeamMembersModule");
const InviteModule_1 = require("../Modules/InviteModule");
const express_1 = require("express");
exports.default = (0, express_1.Router)().use('/users', UsersModule_1.UserRoute)
    .use('/teams', TeamsModule_1.TeamRoute)
    .use('/invites', InviteModule_1.InviteRoute)
    .use('/team-members', TeamMembersModule_1.TeamMemberRoute);
