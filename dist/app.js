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
const express_1 = __importDefault(require("express"));
const Database_1 = __importDefault(require("./Database"));
const Config_1 = __importDefault(require("./Config"));
const cors_1 = __importDefault(require("cors"));
const Routes_1 = __importDefault(require("./Routes"));
const RequestHandler_1 = require("./MiddleWare/RequestHandler");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({}));
app.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
app.use(express_1.default.json());
app.use('/files', express_1.default.static('./public/'));
app.use('/api/v1', Routes_1.default);
app.use('*', (req, res) => res.send((0, RequestHandler_1.failedResponse)({ statusCode: 400, message: 'Unauthorized user' })));
app.listen(Config_1.default.keys.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    // initialize db
    yield Database_1.default.sync({ alter: true, force: false })
        .then(data => console.log('App running... '))
        .catch(err => {
        console.log('Error ************: ', err === null || err === void 0 ? void 0 : err.message);
    });
}));
