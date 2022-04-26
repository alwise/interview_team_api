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
const user_model_1 = __importDefault(require("./user_model"));
const _1 = require(".");
const UserController = {
    create: (userData) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield user_model_1.default.create(userData === null || userData === void 0 ? void 0 : userData.body);
        const result = yield _1.AuthMiddleware.loginResponse(data);
        return (0, RequestHandler_1.successResponse)({ message: 'Created successfully', data: result });
    }),
    update: (userData) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield user_model_1.default.update(userData === null || userData === void 0 ? void 0 : userData.body);
        return (0, RequestHandler_1.successResponse)({ message: 'Updated successfully', data });
    }),
    delete: (userData) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield user_model_1.default.delete(JSON.parse(JSON.stringify(userData === null || userData === void 0 ? void 0 : userData.queries)));
        return (0, RequestHandler_1.successResponse)({ message: 'Deleted successfully', data });
    }),
    findByUid: (userData) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const data = yield user_model_1.default.findOneByID((_a = JSON.parse(JSON.stringify(userData === null || userData === void 0 ? void 0 : userData.queries))) === null || _a === void 0 ? void 0 : _a.uid);
        return (0, RequestHandler_1.successResponse)({ message: 'Data retrieved successfully.', data });
    }),
    findAllByOptions: (userData) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield user_model_1.default.findManyByOptions(JSON.parse(JSON.stringify(userData === null || userData === void 0 ? void 0 : userData.queries)));
        return (0, RequestHandler_1.successResponse)({ message: 'Data retrieved successfully.', data });
    }),
};
exports.default = UserController;
