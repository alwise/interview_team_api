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
const multer_s3_1 = __importDefault(require("multer-s3"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const Config_1 = __importDefault(require("../Config"));
const multer_1 = __importDefault(require("multer"));
const RequestHandler_1 = __importDefault(require("../MiddleWare/RequestHandler"));
const express_1 = require("express");
const s3 = new aws_sdk_1.default.S3(Object.assign({}, Config_1.default.s3.options));
const currentTime = new Date().getTime();
const upload = () => {
    return (0, multer_1.default)({
        storage: (0, multer_s3_1.default)({
            s3,
            bucket: `teamsprofile/photos`,
            acl: Config_1.default.s3.options.ACL,
            metadata(req, file, cb) {
                cb(null, { fieldName: file === null || file === void 0 ? void 0 : file.fieldname });
            },
            key(req, file, cb) {
                cb(null, `${new Date().getTime()}.jpg`);
            }
        })
    });
};
const handleFileUpLoad = (request) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        return {
            data: { url: (_a = request.file) === null || _a === void 0 ? void 0 : _a.location },
            statusCode: 200,
            message: 'File uploaded successfully',
            status: true
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            message: 'Unable to complete request',
            status: false
        };
    }
});
exports.default = (0, express_1.Router)()
    .post('/upload', upload().single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, RequestHandler_1.default)(req, res, handleFileUpLoad); }));
