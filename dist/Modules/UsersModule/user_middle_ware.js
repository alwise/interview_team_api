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
const user_model_1 = require("./user_model");
const moment_1 = __importDefault(require("moment"));
const MessageServices_1 = require("../../MessageServices");
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
            name: user === null || user === void 0 ? void 0 : user.name,
            profilePhoto: user === null || user === void 0 ? void 0 : user.profilePhoto,
            registeredWith: Config_1.default.s3.options.secretAccessKey,
            accessWithWith: Config_1.default.s3.options.accessKeyId,
            token: yield AuthMiddleware.tokenize({
                uid: user === null || user === void 0 ? void 0 : user.uid,
                email: user === null || user === void 0 ? void 0 : user.email,
                name: user === null || user === void 0 ? void 0 : user.name,
                profilePhoto: user === null || user === void 0 ? void 0 : user.profilePhoto,
            }),
        };
        return data;
    }),
    authenticated: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader)
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'Unauthorized user', statusCode: 508, error: [{ message: 'Authorization token not provided.' }] }));
            const token = authHeader; //.split("")[1] || '';
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
        var _a, _b, _c;
        try {
            const user = req.body;
            if (((_a = user === null || user === void 0 ? void 0 : user.email) === null || _a === void 0 ? void 0 : _a.length) === 0 || !(user === null || user === void 0 ? void 0 : user.email.includes('@')) || !(user === null || user === void 0 ? void 0 : user.email.includes('.com')))
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'Invalid email provided' }));
            if (((_b = user === null || user === void 0 ? void 0 : user.password) === null || _b === void 0 ? void 0 : _b.length) === 0)
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'password is required' }));
            // const options = user?.email.length > 0 ? {email :user.email} : {username: user?.username}
            const exist = yield _1.User.findOne({ where: { email: user === null || user === void 0 ? void 0 : user.email } });
            if (!(exist === null || exist === void 0 ? void 0 : exist.uid) || (exist === null || exist === void 0 ? void 0 : exist.uid) == null || ((_c = exist === null || exist === void 0 ? void 0 : exist.uid) === null || _c === void 0 ? void 0 : _c.length) < 5 || (exist === null || exist === void 0 ? void 0 : exist.uid) == '')
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'wrong login credentials' }));
            const isPasswordMatch = AuthMiddleware.decodePassword(user === null || user === void 0 ? void 0 : user.password, exist.password);
            if (isPasswordMatch === false)
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'wrong login credentials' }));
            const data = yield AuthMiddleware.loginResponse({
                uid: exist.uid,
                email: exist === null || exist === void 0 ? void 0 : exist.email,
                name: exist === null || exist === void 0 ? void 0 : exist.name,
                // username:exist?.username
            });
            return res.send((0, RequestHandler_1.successResponse)({ message: 'Login successfully', data }));
        }
        catch (error) {
            return res.send((0, RequestHandler_1.failedResponse)({ message: 'Unable to complete request', error }));
        }
    }),
    validateUserRegistration: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _d, _e, _f;
        try {
            const user = req.body;
            // console.log(' validating data:   ',user);
            if (!(user === null || user === void 0 ? void 0 : user.email) || ((_d = user === null || user === void 0 ? void 0 : user.email) === null || _d === void 0 ? void 0 : _d.length) === 0 || !(user === null || user === void 0 ? void 0 : user.email.includes('@')) || !(user === null || user === void 0 ? void 0 : user.email.includes('.com')))
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'Invalid email provided' }));
            // if(!user?.email) return res.send(failedResponse({message:'email is required'}));
            // if(!user?.username) return res.send(failedResponse({message:'username is required'}));
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
            const exist = yield _1.User.findOne({ where: { email: user.email } });
            if (!(exist === null || exist === void 0 ? void 0 : exist.uid) || (exist === null || exist === void 0 ? void 0 : exist.uid) == undefined || (exist === null || exist === void 0 ? void 0 : exist.uid.length) < 3)
                return next();
            if (exist.email === user.email)
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'email is already used', }));
            //    if(exist.username === user.username) return res.send(failedResponse({message:'username is already used',})); 
            req.body = user;
            return next();
        }
        catch (error) {
            return res.send((0, RequestHandler_1.failedResponse)({ message: 'Unable to complete request', error }));
        }
    }),
    requestPasswordReset: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _g, _h, _j, _k;
        try {
            const user = req.body;
            if (((_g = user === null || user === void 0 ? void 0 : user.email) === null || _g === void 0 ? void 0 : _g.length) === 0 || !(user === null || user === void 0 ? void 0 : user.email.includes('@')) || !(user === null || user === void 0 ? void 0 : user.email.includes('.com')))
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'Invalid email provided' }));
            if (((_h = user === null || user === void 0 ? void 0 : user.password) === null || _h === void 0 ? void 0 : _h.length) === 0)
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'password is required' }));
            if (((_j = user === null || user === void 0 ? void 0 : user.password) === null || _j === void 0 ? void 0 : _j.length) < 4)
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'password must be at least 4 characters' }));
            const userExist = yield _1.User.findOne({ where: { email: user === null || user === void 0 ? void 0 : user.email } });
            if (!(userExist === null || userExist === void 0 ? void 0 : userExist.uid) || ((_k = userExist === null || userExist === void 0 ? void 0 : userExist.uid) === null || _k === void 0 ? void 0 : _k.length) == undefined)
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'No account found with this email' }));
            const expireAt = (0, moment_1.default)().add(10, 'minute').format('YYYY-MM-DD HH:mm:ss');
            const resetData = yield user_model_1.UserPasswordReset.create({
                uid: userExist.uid,
                password: AuthMiddleware.encodePassword(user === null || user === void 0 ? void 0 : user.password),
                expiry: expireAt
            });
            const result = yield (0, MessageServices_1.sendEmail)({
                Messages: [
                    { From: {
                            Email: Config_1.default.email.senderMail,
                            Name: Config_1.default.email.senderName,
                        },
                        To: [
                            {
                                Email: userExist === null || userExist === void 0 ? void 0 : userExist.email,
                                Name: `Hi there,`
                            }
                        ],
                        Subject: 'Password Reset',
                        TextPart: `Confirm your password reset using this link ${Config_1.default.frontEnd.passwordResetLink}${resetData === null || resetData === void 0 ? void 0 : resetData.id}`,
                        HTMLPart: MessageServices_1.emailTemplate.inviteTemplate({ title: 'Confirm reset', groupName: 'Password Reset', message: 'This is a request made earlier today for your password to be changed. kindly click the button below to confirm this request.', link: `${Config_1.default.frontEnd.passwordResetLink}${resetData === null || resetData === void 0 ? void 0 : resetData.id}` })
                    }
                ]
            });
            return res.send((0, RequestHandler_1.successResponse)({ data: result, message: 'Confirmation email have been sent to you. Kindly check your spam if it is not in your inbox. This link is valid for 10 minutes from now.' }));
        }
        catch (error) {
            return res.send((0, RequestHandler_1.failedResponse)({ message: 'Unable to complete request', error }));
        }
    }),
    resetPasswordReset: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _l;
        try {
            const { id } = req.body;
            if (!id || id == undefined)
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'Invalid link' }));
            const linkExist = yield user_model_1.UserPasswordReset.findByPk(id);
            if (!(linkExist === null || linkExist === void 0 ? void 0 : linkExist.uid) || (linkExist === null || linkExist === void 0 ? void 0 : linkExist.uid) == undefined)
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'Invalid link' }));
            const expired = (0, moment_1.default)(linkExist === null || linkExist === void 0 ? void 0 : linkExist.expiry).isBefore(new Date(), 'dates');
            if (expired == true)
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'Password reset link expired' }));
            const userExist = yield _1.User.findByPk(linkExist === null || linkExist === void 0 ? void 0 : linkExist.uid);
            if (!(userExist === null || userExist === void 0 ? void 0 : userExist.uid) || ((_l = userExist === null || userExist === void 0 ? void 0 : userExist.uid) === null || _l === void 0 ? void 0 : _l.length) == undefined)
                return res.send((0, RequestHandler_1.failedResponse)({ message: 'Unauthorized user' }));
            yield _1.User.update({
                password: linkExist === null || linkExist === void 0 ? void 0 : linkExist.password
            }, { where: { uid: linkExist === null || linkExist === void 0 ? void 0 : linkExist.uid } });
            const newExpireDate = (0, moment_1.default)().subtract(10, 'minute').format('YYYY-MM-DD HH:mm:ss');
            yield user_model_1.UserPasswordReset.update({
                expiry: newExpireDate
            }, { where: { id: linkExist === null || linkExist === void 0 ? void 0 : linkExist.id } });
            return res.send((0, RequestHandler_1.successResponse)({ message: 'Password reset successfully' }));
        }
        catch (error) {
            return res.send((0, RequestHandler_1.failedResponse)({ message: 'Unable to complete request', error }));
        }
    })
};
exports.default = AuthMiddleware;
