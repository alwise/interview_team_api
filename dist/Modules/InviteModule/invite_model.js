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
exports.Invite = void 0;
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../../Database/index"));
class Invite extends sequelize_1.Model {
}
exports.Invite = Invite;
Invite.init({
    id: { type: sequelize_1.DataTypes.UUID, allowNull: false, primaryKey: true, defaultValue: sequelize_1.UUIDV4 },
    teamId: { type: sequelize_1.DataTypes.STRING(180) },
    email: { type: sequelize_1.DataTypes.STRING(150) },
    status: { type: sequelize_1.DataTypes.STRING(25), defaultValue: 'Sent' },
    metadata: { type: sequelize_1.DataTypes.JSON },
}, { sequelize: index_1.default, underscored: true, freezeTableName: true });
const InviteOperation = {
    create: (inviteData) => __awaiter(void 0, void 0, void 0, function* () { return yield Invite.create(inviteData); }),
    update: (inviteData) => __awaiter(void 0, void 0, void 0, function* () { return yield Invite.update({ inviteData }, { where: { id: inviteData.id } }); }),
    delete: (inviteData) => __awaiter(void 0, void 0, void 0, function* () { return yield Invite.destroy({ where: { id: inviteData.id } }); }),
    findOneByID: (id) => __awaiter(void 0, void 0, void 0, function* () { return yield Invite.findByPk(id); }),
    findManyByOptions: (options) => __awaiter(void 0, void 0, void 0, function* () { return yield Invite.findAll({ where: Object.assign({}, options) }); }),
};
exports.default = InviteOperation;
