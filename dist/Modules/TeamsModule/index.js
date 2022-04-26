"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamRoute = exports.TeamMiddleware = exports.Team = exports.TeamController = void 0;
const team_controller_1 = __importDefault(require("./team_controller"));
exports.TeamController = team_controller_1.default;
const team_model_1 = require("./team_model");
Object.defineProperty(exports, "Team", { enumerable: true, get: function () { return team_model_1.Team; } });
const team_middleware_1 = __importDefault(require("./team_middleware"));
exports.TeamMiddleware = team_middleware_1.default;
const team_route_1 = __importDefault(require("./team_route"));
exports.TeamRoute = team_route_1.default;
