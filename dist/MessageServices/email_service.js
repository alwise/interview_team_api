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
const node_mailjet_1 = __importDefault(require("node-mailjet"));
const Config_1 = __importDefault(require("../Config"));
const emailSender = node_mailjet_1.default.connect(Config_1.default.email.privateKey, Config_1.default.email.publicKey);
const sendEmail = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield emailSender
        .post("send", { 'version': 'v3.1' })
        .request(data
    // {
    // Messages: [data]
    // "Messages":[{
    //     "From": {
    //         "Email": "alwisestudio@gmail.com",
    //         "Name": "School Message"
    //     },
    //     "To": [{
    //         "Email": "kemevoralwise@gmail.com",
    //         "Name": "Elvis Kemevor"
    //     }],
    //     "Subject": "Your email flight plan!",
    //     "TextPart": "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
    //     "HTMLPart": "<h3>Dear passenger 1, welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!</h3><br />May the delivery force be with you!"
    // }]
    // }
    );
    return request.body;
});
exports.default = sendEmail;
