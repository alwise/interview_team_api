import dotenv from "dotenv";
import { Dialect } from "sequelize";
dotenv.config();
const dialect: Dialect = "postgres";

export default {
  database: {
    uri: process.env.db_url || "",
    options: {
      dialect,
      dialectOptions: {
        decimalNumbers: true,
        // ssl: {
        //     require: false, // This will help you. But you will see nwe error
        //     rejectUnauthorized: false // This line will fix new error
        //   }
      },
    },
  },
  keys: {
    PORT: process.env.PORT || 2500,
    tokenSecrete: process.env.token_secret,
  },

  fileExtensions: {
    jpg: ".jpg",
  },

  s3: {
    baseUrl: process.env.s3Url,
    options: {
      accessKeyId: process.env.accessKeyId,
      secretAccessKey: process.env.secretAccessKey,
      ACL: "public-read",
      baseBucket: "team",
      region: "eu-west-1",
    },
  },
  email: {
    privateKey: process.env.privateKey,
    publicKey: process.env.publicKey,
    senderMail: process.env.senderMail,
    senderName: process.env.sendName,
  },
  frontEnd: {
    passwordResetLink:
      process.env.NODE_ENV == "dev"
        ? "http://localhost:3000/reset-password/?id="
        : "https://teams.bookgmt.com/reset-password/?id=",

    inviteLink:
      process.env.NODE_ENV == "dev"
        ? "http://localhost:3000/accept-invite/?id="
        : "https://teams.bookgmt.com/accept-invite/?id=",
  },
};
