"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtConfig = void 0;
const dotenv = require("dotenv");
dotenv.config({
    path: process.env.ENV_FILE,
    encoding: 'utf8',
});
exports.JwtConfig = {
    SALT_ROUNDS: parseInt(process.env.JWT_SALT_ROUNDS || '10'),
    SECRET_KEY: process.env.JWT_SECRET_KEY || 'local',
    EXPIRE_IN: parseInt(process.env.JWT_EXPIRE_IN || '3600'),
    TOKEN_TYPE: 'Bearer',
};
//# sourceMappingURL=jwt.config.js.map