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
exports.UserPasswordReset = exports.User = void 0;
const sequelize_1 = require("sequelize");
const Database_1 = __importDefault(require("../../Database"));
const TeamsModule_1 = require("../TeamsModule");
class User extends sequelize_1.Model {
}
exports.User = User;
/**
 *  initialize  User schema to create user table in database
 */
User.init({
    uid: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.UUIDV4,
    },
    name: { type: sequelize_1.DataTypes.STRING(180) },
    profilePhoto: { type: sequelize_1.DataTypes.STRING() },
    email: {
        type: sequelize_1.DataTypes.STRING(140),
        unique: { name: "email", msg: "Email already exist." },
        validate: { isEmail: { msg: "Invalid email." } },
    },
    // username: {
    //   type: DataTypes.STRING(60),
    //   allowNull:true
    //   // unique: { name: "username", msg: "username already exist." },
    // },
    password: { type: sequelize_1.DataTypes.STRING(120) },
}, {
    underscored: true,
    freezeTableName: true,
    sequelize: Database_1.default,
});
User.hasMany(TeamsModule_1.Team, { foreignKey: 'ownerId', onDelete: 'CASCADE' });
class UserPasswordReset extends sequelize_1.Model {
}
exports.UserPasswordReset = UserPasswordReset;
UserPasswordReset.init({
    id: { type: sequelize_1.DataTypes.UUID, allowNull: false, defaultValue: sequelize_1.UUIDV4, primaryKey: true },
    uid: { type: sequelize_1.DataTypes.UUID, allowNull: false },
    password: { type: sequelize_1.DataTypes.STRING(180), allowNull: false },
    expiry: { type: sequelize_1.DataTypes.DATE, allowNull: false }
}, {
    underscored: true,
    freezeTableName: true,
    sequelize: Database_1.default,
});
/**
 *  crude operations
 */
const UserOperations = {
    create: (userData) => __awaiter(void 0, void 0, void 0, function* () { return yield User.create(userData); }),
    update: (userData) => __awaiter(void 0, void 0, void 0, function* () { return yield User.update(Object.assign({}, userData), { where: { uid: userData === null || userData === void 0 ? void 0 : userData.uid } }); }),
    delete: (userData) => __awaiter(void 0, void 0, void 0, function* () { return yield User.destroy({ where: { uid: userData.uid } }); }),
    findOneByID: (uid) => __awaiter(void 0, void 0, void 0, function* () { return yield User.findByPk(uid); }),
    findManyByOptions: (options) => __awaiter(void 0, void 0, void 0, function* () { return yield User.findAll({ where: Object.assign({}, options) }); }),
    findForTeam: (userIdList) => __awaiter(void 0, void 0, void 0, function* () { return yield User.findAll({ where: { uid: { [sequelize_1.Op.in]: userIdList } }, attributes: { exclude: ['password'] } }); }),
};
exports.default = UserOperations;
