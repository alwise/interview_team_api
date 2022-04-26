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
exports.TeamMember = void 0;
const sequelize_1 = require("sequelize");
const Database_1 = __importDefault(require("../../Database"));
const UsersModule_1 = require("../UsersModule");
const TeamsModule_1 = require("../TeamsModule");
class TeamMember extends sequelize_1.Model {
}
exports.TeamMember = TeamMember;
TeamMember.init({
    id: { type: sequelize_1.DataTypes.UUID, allowNull: false, defaultValue: sequelize_1.UUIDV4, primaryKey: true },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: UsersModule_1.User,
            key: 'uid'
        }
    },
    teamId: { type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: TeamsModule_1.Team,
            key: 'id'
        }
    },
    role: { type: sequelize_1.DataTypes.STRING(50), allowNull: false, defaultValue: 'Member' },
}, { sequelize: Database_1.default, underscored: true, freezeTableName: true });
TeamMember.belongsTo(TeamsModule_1.Team, { foreignKey: 'teamId', onDelete: 'cascade' });
TeamMember.belongsTo(UsersModule_1.User, { foreignKey: 'userId', onDelete: 'cascade' });
const TeamMemberOperations = {
    create: (teamMemberData) => __awaiter(void 0, void 0, void 0, function* () { return yield TeamMember.create(teamMemberData); }),
    update: (teamMemberData) => __awaiter(void 0, void 0, void 0, function* () { return yield TeamMember.update({ teamMemberData }, { where: { id: teamMemberData.id } }); }),
    delete: (teamMemberData) => __awaiter(void 0, void 0, void 0, function* () { return yield TeamMember.create({ teamMemberData }); }),
    findOneByID: (id) => __awaiter(void 0, void 0, void 0, function* () { return yield TeamMember.findByPk(id, { include: [{ all: true }] }); }),
    findManyByOptions: (options) => __awaiter(void 0, void 0, void 0, function* () { return yield TeamMember.findAll({ where: Object.assign({}, options), include: [{ all: true }] }); }),
};
exports.default = TeamMemberOperations;
