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
const member_models_1 = require("./member_models");
const TeamMemberController = {
    create: (teamMemberData) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId, teamId } = teamMemberData === null || teamMemberData === void 0 ? void 0 : teamMemberData.body;
        const exist = yield member_models_1.TeamMemberOperations.findManyByOptions({
            userId, teamId
        });
        if (exist.length > 0) {
            return (0, RequestHandler_1.failedResponse)({ message: 'Invitee already assigned to this team', data: exist[0] });
        }
        const data = yield member_models_1.TeamMemberOperations.create(teamMemberData.body);
        return (0, RequestHandler_1.successResponse)({ message: 'You have successfully accepted invite', data });
    }),
    update: (teamMemberData) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield member_models_1.TeamMemberOperations.update(teamMemberData.body);
        return (0, RequestHandler_1.successResponse)({ message: 'Updated successfully', data });
    }),
    delete: (teamMemberData) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId, teamId } = JSON.parse(JSON.stringify(teamMemberData.queries));
        const data = yield member_models_1.TeamMemberOperations.delete({ userId, teamId });
        console.log('Deting...', userId, teamId);
        return (0, RequestHandler_1.successResponse)({ message: 'Deleted successfully', data });
    }),
    findByUid: (teamMemberData) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const data = yield member_models_1.TeamMemberOperations.findOneByID((_a = JSON.parse(JSON.stringify(teamMemberData.params))) === null || _a === void 0 ? void 0 : _a.id);
        return (0, RequestHandler_1.successResponse)({ message: 'Data retrieved successfully.', data });
    }),
    findAllByOptions: (teamMemberData) => __awaiter(void 0, void 0, void 0, function* () {
        const val = JSON.parse(JSON.stringify(teamMemberData.queries));
        if (!val)
            return (0, RequestHandler_1.successResponse)({ message: 'Data retrieved successfully.', data: [] });
        const data = yield member_models_1.TeamMemberOperations.findManyByOptions(val);
        return (0, RequestHandler_1.successResponse)({ message: 'Data retrieved successfully.', data });
    }),
};
exports.default = TeamMemberController;
