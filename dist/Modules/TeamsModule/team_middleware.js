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
const TeamMiddleware = {
    validateTeamCreation: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            const data = req.body;
            if (!(data === null || data === void 0 ? void 0 : data.name) || (data === null || data === void 0 ? void 0 : data.name.length) == 0)
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'Team name is required' }));
            if (!(data === null || data === void 0 ? void 0 : data.ownerId) || (data === null || data === void 0 ? void 0 : data.ownerId.length) == 0)
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'Unable to complete request', error: { message: 'ownerId is not provided' } }));
            req.body = { name: (_b = (_a = data === null || data === void 0 ? void 0 : data.name) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === null || _b === void 0 ? void 0 : _b.trim(), ownerId: (_c = data === null || data === void 0 ? void 0 : data.ownerId) === null || _c === void 0 ? void 0 : _c.trim() };
            return next();
        }
        catch (error) {
            return res.send((0, RequestHandler_1.failedResponse)({ message: 'Unable to complete request', error }));
        }
    }),
    validateTeamUpdate: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _d, _e, _f;
        try {
            const data = req.body;
            if (!(data === null || data === void 0 ? void 0 : data.id) || (data === null || data === void 0 ? void 0 : data.id.length) == 0)
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'Unable to complete request', error: { message: 'Id is required.' } }));
            if (!(data === null || data === void 0 ? void 0 : data.name) || (data === null || data === void 0 ? void 0 : data.name.length) == 0)
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'Team name is required' }));
            req.body = { name: (_e = (_d = data === null || data === void 0 ? void 0 : data.name) === null || _d === void 0 ? void 0 : _d.toLowerCase()) === null || _e === void 0 ? void 0 : _e.trim(), id: (_f = data === null || data === void 0 ? void 0 : data.id) === null || _f === void 0 ? void 0 : _f.trim() };
            return next();
        }
        catch (error) {
            return res.send((0, RequestHandler_1.failedResponse)({ message: 'Unable to complete request', error }));
        }
    })
};
exports.default = TeamMiddleware;
