"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Config_1 = __importDefault(require("../Config"));
/**
 * initialize database
 */
const sequelize = new sequelize_1.Sequelize(Config_1.default.database.uri, Config_1.default.database.options);
// sequelize.authenticate();
exports.default = sequelize;
