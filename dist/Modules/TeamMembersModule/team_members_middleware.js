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
const TeamMemberMiddleware = {
    validateCreate: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        try {
            const data = req.body;
            if (!(data === null || data === void 0 ? void 0 : data.role) || ((_a = data === null || data === void 0 ? void 0 : data.role) === null || _a === void 0 ? void 0 : _a.length) == 0)
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'Unable to complete request', error: { message: 'Role is required.' } }));
            if (!(data === null || data === void 0 ? void 0 : data.teamId) || ((_b = data === null || data === void 0 ? void 0 : data.teamId) === null || _b === void 0 ? void 0 : _b.length) == 0)
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'Unable to complete request', error: { message: 'Team id is required.' } }));
            if (!(data === null || data === void 0 ? void 0 : data.userId) || ((_c = data === null || data === void 0 ? void 0 : data.userId) === null || _c === void 0 ? void 0 : _c.length) == 0)
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'Unable to complete request', error: { message: 'User id is required.' } }));
            const exist = yield member_models_1.TeamMember.findOne({ where: { userId: data.userId, teamId: data === null || data === void 0 ? void 0 : data.teamId } });
            if (!(exist === null || exist === void 0 ? void 0 : exist.id) || (exist === null || exist === void 0 ? void 0 : exist.id) == undefined || ((_d = exist === null || exist === void 0 ? void 0 : exist.id) === null || _d === void 0 ? void 0 : _d.length) == 0)
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'User already assigned to team', error: { message: 'User already assigned to this service' } }));
            req.body = {
                role: data === null || data === void 0 ? void 0 : data.role,
                teamId: data === null || data === void 0 ? void 0 : data.teamId,
                userId: data === null || data === void 0 ? void 0 : data.userId,
            };
            return next();
        }
        catch (error) {
            return res.send((0, RequestHandler_1.failedResponse)({ message: 'Unable to complete request', error }));
        }
    })
};
exports.default = TeamMemberMiddleware;
