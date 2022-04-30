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
const express_1 = require("express");
const MiddleWare_1 = require("../../MiddleWare");
const _1 = require(".");
// import { AuthMiddleware } from "../UsersModule";
exports.default = (0, express_1.Router)()
    .post('/create', _1.TeamMiddleware.validateTeamCreation, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, MiddleWare_1.handleRequestData)(req, res, _1.TeamController.create); }))
    .patch('/update', _1.TeamMiddleware.validateTeamUpdate, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, MiddleWare_1.handleRequestData)(req, res, _1.TeamController.update); }))
    .delete('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, MiddleWare_1.handleRequestData)(req, res, _1.TeamController.delete); }))
    .get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, MiddleWare_1.handleRequestData)(req, res, _1.TeamController.findByUid); }))
    .get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, MiddleWare_1.handleRequestData)(req, res, _1.TeamController.findAllByOptions); }));
