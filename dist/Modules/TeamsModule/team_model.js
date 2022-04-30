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
exports.Team = void 0;
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../../Database/index"));
class Team extends sequelize_1.Model {
}
exports.Team = Team;
/**
 *  initialize & create team table
 */
Team.init({
    id: { type: sequelize_1.DataTypes.UUID, allowNull: false, primaryKey: true, defaultValue: sequelize_1.UUIDV4 },
    name: { type: sequelize_1.DataTypes.STRING(180), allowNull: false, unique: { name: 'name', msg: 'Team name already exist' } },
    // ownerId:{type:DataTypes.STRING(180),allowNull:false},
}, { sequelize: index_1.default, underscored: true, freezeTableName: true });
const TeamOperations = {
    create: (teamData) => __awaiter(void 0, void 0, void 0, function* () { return yield Team.create(teamData); }),
    update: (teamData) => __awaiter(void 0, void 0, void 0, function* () { return yield Team.update({ teamData }, { where: { id: teamData.id } }); }),
    delete: (teamData) => __awaiter(void 0, void 0, void 0, function* () { return yield Team.destroy({ where: { id: teamData.id } }); }),
    findOneByID: (id) => __awaiter(void 0, void 0, void 0, function* () { return yield Team.findByPk(id); }),
    findManyByOptions: (options) => __awaiter(void 0, void 0, void 0, function* () { return yield Team.findAll({ where: Object.assign({}, options) }); })
};
exports.default = TeamOperations;
