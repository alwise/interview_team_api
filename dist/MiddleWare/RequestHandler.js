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
Object.defineProperty(exports, "__esModule", { value: true });
exports.failedResponse = exports.successResponse = void 0;
const handleRequestData = (req, res, callBack) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield callBack({
            file: req === null || req === void 0 ? void 0 : req.file,
            params: req === null || req === void 0 ? void 0 : req.params,
            body: req.body,
            queries: req.query
        });
        return res.send(result);
    }
    catch (error) {
        return res.send({
            status: false,
            message: 'unable to complete request.',
            statusCode: 500,
            error: { message: error === null || error === void 0 ? void 0 : error.message, error }
        });
    }
});
const successResponse = (data) => {
    return {
        status: (data === null || data === void 0 ? void 0 : data.status) || true,
        message: (data === null || data === void 0 ? void 0 : data.message) || 'Request completed successfully',
        statusCode: (data === null || data === void 0 ? void 0 : data.statusCode) || 200,
        data: (data === null || data === void 0 ? void 0 : data.data) || []
    };
};
exports.successResponse = successResponse;
const failedResponse = (data) => {
    return {
        status: false,
        message: (data === null || data === void 0 ? void 0 : data.message) || 'Unable to complete request',
        statusCode: (data === null || data === void 0 ? void 0 : data.statusCode) || 500,
        // data:data?.data || [],
        error: data === null || data === void 0 ? void 0 : data.error,
    };
};
exports.failedResponse = failedResponse;
exports.default = handleRequestData;
