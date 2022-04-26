"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestHandler_1 = require("../../MiddleWare/RequestHandler");
const TeamMembersModule_1 = require("../TeamMembersModule");
const UsersModule_1 = require("../UsersModule");
const invite_model_1 = require("./invite_model");
const InviteMiddleware = {
    validateInviteData: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const data = req.body;
            if (!(data === null || data === void 0 ? void 0 : data.email) || ((_a = data === null || data === void 0 ? void 0 : data.email) === null || _a === void 0 ? void 0 : _a.length) == 0)
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'email is required', error: { message: 'invitee email is required.' } }));
            if (!(data === null || data === void 0 ? void 0 : data.teamId) || ((_b = data === null || data === void 0 ? void 0 : data.teamId) === null || _b === void 0 ? void 0 : _b.length) == 0)
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'Unable to complete request', error: { message: 'team id is required.' } }));
            const user = yield UsersModule_1.User.findOne({
                where: { email: data.email.toLocaleLowerCase() }
            });
            if (user === null || user === void 0 ? void 0 : user.uid) {
                const userAlreadyTeamMember = yield TeamMembersModule_1.TeamMember.findOne({
                    where: { teamId: data === null || data === void 0 ? void 0 : data.teamId, userId: user === null || user === void 0 ? void 0 : user.uid }
                });
                if (userAlreadyTeamMember === null || userAlreadyTeamMember === void 0 ? void 0 : userAlreadyTeamMember.id)
                    return res.send((0, RequestHandler_1.failedResponse)({ message: 'User already assigned to team', error: { message: 'team id is required.' } }));
            }
            req.body = {
                teamId: data === null || data === void 0 ? void 0 : data.teamId,
                email: data === null || data === void 0 ? void 0 : data.email,
                status: 'Sent',
                metadata: {},
            };
            return next();
        }
        catch (error) {
            return res.send((0, RequestHandler_1.failedResponse)({ message: 'Unable to complete request', error: { message: error.message, error } }));
        }
    }),
    isValidLinkAnUserExist: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _c, _d;
        try {
            const data = JSON.parse(JSON.stringify(req.query));
            if (!(data === null || data === void 0 ? void 0 : data.id) || (data === null || data === void 0 ? void 0 : data.id) === undefined || ((_c = data === null || data === void 0 ? void 0 : data.id) === null || _c === void 0 ? void 0 : _c.length) < 3)
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'Invalid invitation link', error: { message: 'no id specified for invitation link' } }));
            const inviteExists = yield invite_model_1.Invite.findByPk(data === null || data === void 0 ? void 0 : data.id);
            if (!(inviteExists === null || inviteExists === void 0 ? void 0 : inviteExists.id) || (inviteExists === null || inviteExists === void 0 ? void 0 : inviteExists.id) === undefined || ((_d = inviteExists === null || inviteExists === void 0 ? void 0 : inviteExists.id) === null || _d === void 0 ? void 0 : _d.length) < 3)
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'Invalid invitation link', error: { message: 'no id specified for invitation link' } }));
            const status = inviteExists.status;
            if (status !== 'Sent')
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'Invalid invitation link', error: { message: 'no id specified for invitation link' } }));
            const userExist = yield UsersModule_1.User.findOne({ where: { email: inviteExists === null || inviteExists === void 0 ? void 0 : inviteExists.email } });
            return res.send((0, RequestHandler_1.successResponse)({ message: 'Data retrieved successfully.', data: userExist }));
        }
        catch (error) {
            return res.send((0, RequestHandler_1.failedResponse)({ message: 'Unable to complete request', error }));
        }
    }),
    isValidLink: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _e, _f;
        try {
            const data = JSON.parse(JSON.stringify(req.query));
            if (!(data === null || data === void 0 ? void 0 : data.id) || (data === null || data === void 0 ? void 0 : data.id) === undefined || ((_e = data === null || data === void 0 ? void 0 : data.id) === null || _e === void 0 ? void 0 : _e.length) < 3)
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'Invalid invitation link', error: { message: 'no id specified for invitation link' } }));
            const inviteExists = yield invite_model_1.Invite.findByPk(data === null || data === void 0 ? void 0 : data.id);
            if (!(inviteExists === null || inviteExists === void 0 ? void 0 : inviteExists.id) || (inviteExists === null || inviteExists === void 0 ? void 0 : inviteExists.id) === undefined || ((_f = inviteExists === null || inviteExists === void 0 ? void 0 : inviteExists.id) === null || _f === void 0 ? void 0 : _f.length) < 3)
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'Invalid invitation link', error: { message: 'no id specified for invitation link' } }));
            const status = inviteExists === null || inviteExists === void 0 ? void 0 : inviteExists.status;
            if (status !== 'Sent')
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'Invalid invitation link', error: { message: 'no id specified for invitation link' } }));
            req.body = {
                id: inviteExists.id,
                teamId: inviteExists === null || inviteExists === void 0 ? void 0 : inviteExists.teamId,
                email: inviteExists === null || inviteExists === void 0 ? void 0 : inviteExists.email,
                status,
                metadata: inviteExists === null || inviteExists === void 0 ? void 0 : inviteExists.metadata
            };
            return next();
        }
        catch (error) {
            return res.send((0, RequestHandler_1.failedResponse)({ message: 'Unable to complete request', error }));
        }
    }),
};
exports.default = InviteMiddleware;
