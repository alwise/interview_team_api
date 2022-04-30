"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dialect = 'postgres';
exports.default = {
    database: {
        uri: process.env.db_url || '',
        options: {
            dialect,
            dialectOptions: {
                decimalNumbers: true
                // ssl: {
                //     require: false, // This will help you. But you will see nwe error
                //     rejectUnauthorized: false // This line will fix new error
                //   }
            }
        }
    },
    keys: {
        PORT: process.env.PORT || 2500,
        tokenSecrete: process.env.token_secret
    },
    fileExtensions: {
        jpg: '.jpg'
    },
    s3: {
        baseUrl: process.env.s3Url,
        options: {
            accessKeyId: process.env.accessKeyId,
            secretAccessKey: process.env.secretAccessKey,
            ACL: 'public-read',
            baseBucket: 'team',
            region: 'eu-west-1'
        },
    },
    email: {
        privateKey: process.env.privateKey,
        publicKey: process.env.publicKey,
        senderMail: process.env.senderMail,
        senderName: process.env.senderName,
    },
    frontEnd: {
        passwordResetLink: process.env.NODE_ENV == 'dev' ? 'http://localhost:3000/reset-password/?id=' : 'https://team.bookgmt.com/reset-password/?id=',
        inviteLink: process.env.NODE_ENV == 'dev' ? 'http://localhost:3000/accept-invite/?id=' : 'https://team.bookgmt.com/accept-invite/?id=',
    }
};
