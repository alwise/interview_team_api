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
const team_model_1 = require("./team_model");
const TeamMiddleware = {
    validateTeamCreation: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        try {
            const data = req.body;
            if (!(data === null || data === void 0 ? void 0 : data.name) || ((_a = data === null || data === void 0 ? void 0 : data.name) === null || _a === void 0 ? void 0 : _a.length) == 0)
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'Team name is required' }));
            const exist = yield team_model_1.Team.findOne({ where: { name: (_c = (_b = data === null || data === void 0 ? void 0 : data.name) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === null || _c === void 0 ? void 0 : _c.trim() } });
            if ((exist === null || exist === void 0 ? void 0 : exist.id) !== undefined)
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'Team name already taken', error: { message: 'team name already exist' } }));
            req.body = { name: (_e = (_d = data === null || data === void 0 ? void 0 : data.name) === null || _d === void 0 ? void 0 : _d.toLowerCase()) === null || _e === void 0 ? void 0 : _e.trim() };
            return next();
        }
        catch (error) {
            return res.send((0, RequestHandler_1.failedResponse)({ message: 'Team name already taken', error }));
        }
    }),
    validateTeamUpdate: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _f, _g, _h;
        try {
            const data = req.body;
            if (!(data === null || data === void 0 ? void 0 : data.id) || (data === null || data === void 0 ? void 0 : data.id.length) == 0)
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'Unable to complete request', error: { message: 'Id is required.' } }));
            if (!(data === null || data === void 0 ? void 0 : data.name) || (data === null || data === void 0 ? void 0 : data.name.length) == 0)
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'Team name is required' }));
            req.body = { name: (_g = (_f = data === null || data === void 0 ? void 0 : data.name) === null || _f === void 0 ? void 0 : _f.toLowerCase()) === null || _g === void 0 ? void 0 : _g.trim(), id: (_h = data === null || data === void 0 ? void 0 : data.id) === null || _h === void 0 ? void 0 : _h.trim() };
            return next();
        }
        catch (error) {
            return res.send((0, RequestHandler_1.failedResponse)({ message: 'Unable to complete request', error }));
        }
    })
};
exports.default = TeamMiddleware;
