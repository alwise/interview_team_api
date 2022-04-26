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
const team_model_1 = __importDefault(require("./team_model"));
const TeamController = {
    create: (teamData) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield team_model_1.default.create(teamData.body);
        return (0, RequestHandler_1.successResponse)({ message: 'Created successfully', data });
    }),
    update: (teamData) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield team_model_1.default.update(teamData.body);
        return (0, RequestHandler_1.successResponse)({ message: 'Updated successfully', data });
    }),
    delete: (teamData) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield team_model_1.default.delete(JSON.parse(JSON.stringify(teamData.queries)));
        return (0, RequestHandler_1.successResponse)({ message: 'Deleted successfully', data });
    }),
    findByUid: (teamData) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const data = yield team_model_1.default.findOneByID((_a = JSON.parse(JSON.stringify(teamData.params))) === null || _a === void 0 ? void 0 : _a.id);
        return (0, RequestHandler_1.successResponse)({ message: 'Data retrieved successfully.', data });
    }),
    findAllByOptions: (teamData) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield team_model_1.default.findManyByOptions(JSON.parse(JSON.stringify(teamData.queries)));
        return (0, RequestHandler_1.successResponse)({ message: 'Data retrieved successfully.', data });
    }),
};
exports.default = TeamController;
