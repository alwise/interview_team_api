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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Config_1 = __importDefault(require("../../Config"));
const RequestHandler_1 = require("../../MiddleWare/RequestHandler");
const _1 = require("./");
const sequelize_1 = require("sequelize");
const AuthMiddleware = {
    encodePassword: (password) => {
        const hash = bcrypt_1.default.hashSync(password, 10);
        return hash;
    },
    decodePassword: (password, passwordHash) => {
        return bcrypt_1.default.compareSync(password, passwordHash);
    },
    tokenize: (data) => {
        return jsonwebtoken_1.default.sign(data, Config_1.default.keys.tokenSecrete, { expiresIn: "1yr" });
    },
    loginResponse: (user) => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            uid: user === null || user === void 0 ? void 0 : user.uid,
            email: user === null || user === void 0 ? void 0 : user.email,
            token: AuthMiddleware.tokenize({
                uid: user === null || user === void 0 ? void 0 : user.uid,
                email: user === null || user === void 0 ? void 0 : user.email,
                name: user === null || user === void 0 ? void 0 : user.name,
                username: user === null || user === void 0 ? void 0 : user.username,
            }),
        };
        return data;
    }),
    authenticated: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader)
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'Unauthorized user', statusCode: 508, error: [{ message: 'Authorization token not provided.' }] }));
            const token = authHeader.split(" ")[1] || '';
            jsonwebtoken_1.default.verify(token, Config_1.default.keys.tokenSecrete, (err, user) => {
                if (err) {
                    return res.send((0, RequestHandler_1.failedResponse)({ statusCode: 508, message: 'Your session has expired login required', error: err }));
                }
                req.body.tokenData = JSON.parse(JSON.stringify(user));
                return next();
            });
        }
        catch (error) {
            return res.send((0, RequestHandler_1.failedResponse)({ message: 'Unable to complete request', error }));
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        try {
            const user = req.body;
            if (((_a = user === null || user === void 0 ? void 0 : user.email) === null || _a === void 0 ? void 0 : _a.length) === 0 && ((_b = user === null || user === void 0 ? void 0 : user.username) === null || _b === void 0 ? void 0 : _b.length) === 0)
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'email or username is required' }));
            if (((_c = user === null || user === void 0 ? void 0 : user.password) === null || _c === void 0 ? void 0 : _c.length) === 0)
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'password is required' }));
            const options = (user === null || user === void 0 ? void 0 : user.email.length) > 0 ? { email: user.email } : { username: user === null || user === void 0 ? void 0 : user.username };
            const exist = yield _1.User.findOne({ where: Object.assign({}, options) });
            if (!(exist === null || exist === void 0 ? void 0 : exist.uid) || (exist === null || exist === void 0 ? void 0 : exist.uid) == null || ((_d = exist === null || exist === void 0 ? void 0 : exist.uid) === null || _d === void 0 ? void 0 : _d.length) < 5 || (exist === null || exist === void 0 ? void 0 : exist.uid) == '')
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'wrong login credentials' }));
            const isPasswordMatch = AuthMiddleware.decodePassword(user === null || user === void 0 ? void 0 : user.password, exist.password);
            if (isPasswordMatch === false)
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'wrong login credentials' }));
            const data = AuthMiddleware.loginResponse({
                uid: exist.uid,
                email: exist === null || exist === void 0 ? void 0 : exist.email,
                name: exist === null || exist === void 0 ? void 0 : exist.name,
                username: exist === null || exist === void 0 ? void 0 : exist.username
            });
            return res.send((0, RequestHandler_1.successResponse)({ message: 'Login successfully', data }));
        }
        catch (error) {
            return res.send((0, RequestHandler_1.failedResponse)({ message: 'Unable to complete request', error }));
        }
    }),
    validateUserRegistration: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _e, _f;
        try {
            const user = req.body;
            console.log(' validating data:   ', user);
            if (!(user === null || user === void 0 ? void 0 : user.email))
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'email is required' }));
            if (!(user === null || user === void 0 ? void 0 : user.username))
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'username is required' }));
            if (!(user === null || user === void 0 ? void 0 : user.password) || ((_e = user === null || user === void 0 ? void 0 : user.password) === null || _e === void 0 ? void 0 : _e.length) < 4)
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'password must be at least 4 characters' }));
            user.password = AuthMiddleware.encodePassword(user === null || user === void 0 ? void 0 : user.password);
            const newEmail = (_f = user === null || user === void 0 ? void 0 : user.email) === null || _f === void 0 ? void 0 : _f.toLowerCase();
            user.email = newEmail;
            req.body = user;
            return next();
        }
        catch (error) {
            return res.send((0, RequestHandler_1.failedResponse)({ message: 'Unable to complete request', error }));
        }
    }),
    userAlreadyExist: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = req.body;
            const exist = yield _1.User.findOne({ where: { [sequelize_1.Op.or]: [{ email: user.email }, { username: user.username }] } });
            if (!(exist === null || exist === void 0 ? void 0 : exist.uid) || (exist === null || exist === void 0 ? void 0 : exist.uid) == undefined || (exist === null || exist === void 0 ? void 0 : exist.uid.length) < 3)
                return next();
            if (exist.email === user.email)
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'email is already used', }));
            if (exist.username === user.username)
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'username is already used', }));
            req.body = user;
            return next();
        }
        catch (error) {
            return res.send((0, RequestHandler_1.failedResponse)({ message: 'Unable to complete request', error }));
        }
    }),
};
exports.default = AuthMiddleware;
