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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestHandler_1 = require("../../MiddleWare/RequestHandler");
const TeamsModule_1 = require("../TeamsModule");
const UsersModule_1 = require("../UsersModule");
const invite_model_1 = __importDefault(require("./invite_model"));
const MessageServices_1 = require("../../MessageServices");
const Config_1 = __importDefault(require("../../Config"));
const TeamMembersModule_1 = require("../TeamMembersModule");
const InviteController = {
    create: (inviteData) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const team = yield TeamsModule_1.Team.findByPk((_a = inviteData.body) === null || _a === void 0 ? void 0 : _a.teamId);
        const data = yield invite_model_1.default.create(inviteData.body);
        const result = yield (0, MessageServices_1.sendEmail)({
            Messages: [
                { From: {
                        Email: Config_1.default.email.senderMail,
                        Name: Config_1.default.email.senderName,
                    },
                    To: [
                        {
                            Email: data === null || data === void 0 ? void 0 : data.email,
                            Name: `Hi there,`
                        }
                    ],
                    Subject: 'Team Invitation',
                    TextPart: `Accept invitation to join @${team === null || team === void 0 ? void 0 : team.name} ${Config_1.default.frontEnd.host}?id=${data === null || data === void 0 ? void 0 : data.id}`,
                    HTMLPart: MessageServices_1.emailTemplate.inviteTemplate({ groupName: team === null || team === void 0 ? void 0 : team.name, link: `${Config_1.default.frontEnd.host}?id=${data === null || data === void 0 ? void 0 : data.id}` })
                }
            ]
        });
        return (0, RequestHandler_1.successResponse)({ message: 'Request completed successfully', data: result });
    }),
    acceptInvite: (inviteData) => __awaiter(void 0, void 0, void 0, function* () {
        // body is set using middleware isValidLink 
        const data = inviteData.body;
        const user = yield UsersModule_1.User.findOne({ where: { email: data === null || data === void 0 ? void 0 : data.email } });
        if (!(user === null || user === void 0 ? void 0 : user.uid) || (user === null || user === void 0 ? void 0 : user.uid) == undefined)
            return (0, RequestHandler_1.failedResponse)({ message: 'Unauthorized user', statusCode: 508 });
        inviteData.body = {
            userId: user === null || user === void 0 ? void 0 : user.uid,
            teamId: data === null || data === void 0 ? void 0 : data.teamId,
            role: 'Member'
        };
        const result = yield TeamMembersModule_1.TeamMemberController.create(inviteData);
        if (result.status == true)
            yield invite_model_1.default.update(Object.assign(Object.assign({}, data), { status: 'Accepted' }));
        return result;
    }),
    delete: (inviteData) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield invite_model_1.default.delete(JSON.parse(JSON.stringify(inviteData.queries)));
        return (0, RequestHandler_1.successResponse)({ message: 'Deleted successfully', data });
    }),
    findByUid: (inviteData) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const data = yield invite_model_1.default.findOneByID((_b = JSON.parse(JSON.stringify(inviteData.params))) === null || _b === void 0 ? void 0 : _b.id);
        return (0, RequestHandler_1.successResponse)({ message: 'Data retrieved successfully.', data });
    }),
    findAllByOptions: (inviteData) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield invite_model_1.default.findManyByOptions(JSON.parse(JSON.stringify(inviteData.queries)));
        return (0, RequestHandler_1.successResponse)({ message: 'Data retrieved successfully.', data });
    }),
};
exports.default = InviteController;
