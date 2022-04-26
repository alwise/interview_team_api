"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailTemplate = exports.sendEmail = void 0;
const email_service_1 = __importDefault(require("./email_service"));
exports.sendEmail = email_service_1.default;
const invite_email_template_1 = __importDefault(require("./EmailTemplates/invite_email_template"));
exports.emailTemplate = invite_email_template_1.default;
