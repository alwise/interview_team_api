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
const express_1 = require("express");
const MiddleWare_1 = require("../../MiddleWare");
const _1 = require(".");
const user_middle_ware_1 = __importDefault(require("./user_middle_ware"));
exports.default = (0, express_1.Router)()
    .post('/create', user_middle_ware_1.default.validateUserRegistration, user_middle_ware_1.default.userAlreadyExist, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, MiddleWare_1.handleRequestData)(req, res, _1.UserController.create); }))
    .post('/login', user_middle_ware_1.default.login)
    .post('/request-reset', user_middle_ware_1.default.requestPasswordReset)
    .patch('/reset-password', user_middle_ware_1.default.resetPasswordReset)
    .patch('/update', user_middle_ware_1.default.authenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, MiddleWare_1.handleRequestData)(req, res, _1.UserController.update); }))
    .delete('/delete', user_middle_ware_1.default.authenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, MiddleWare_1.handleRequestData)(req, res, _1.UserController.delete); }))
    // .get('/:id',AuthMiddleware.authenticated,async (req: Request, res: Response) =>
    // await handleRequestData(req, res, UserController.findByUid))
    .get('/', user_middle_ware_1.default.authenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, MiddleWare_1.handleRequestData)(req, res, _1.UserController.findAllByOptions); }))
    .get('/for-team', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, MiddleWare_1.handleRequestData)(req, res, _1.UserController.findForTeam); }));
